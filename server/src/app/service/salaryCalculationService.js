import { createSalaryMd, detailAccountMd, detailInsuranceMd, detailSalaryMd, listTimekeepingMd } from '@repository';
import { roundNumber } from '@utils';

export class Salary {
  constructor({ month, accountId, from, to, note, config, salarySetup, taxSetup, by, bonuses }) {
    this.month = month;
    this.accountId = accountId;
    this.from = from;
    this.to = to;
    this.note = note;
    this.config = config;
    this.salarySetup = salarySetup;
    this.taxSetup = taxSetup;
    this.by = by;
    this.bonuses = bonuses;
  }

  async setUp() {
    this.account = await detailAccountMd({ _id: this.accountId }, [{ path: 'position', select: 'allowances' }]);
    this.baseSalary = this.account?.salary;
    this.allowances = this.account?.position?.allowances;
    this.dependent = (await detailInsuranceMd({ account: this.accountId }))?.dependents?.length || 0;
    this.timekeepings = await listTimekeepingMd({ account: this.accountId, date: { $gte: this.from, $lte: this.to } }, false, false, [
      { path: 'applications', select: 'type' }
    ]);
  }

  async valid() {
    if (!this.account) return { status: 0, mess: 'Không tìm thấy nhân viên' };
    if (!this.timekeepings?.length > 0) return { status: 0, mess: 'Nhân viên không có lịch làm việc trong thời gian tính' };
    if (!this.baseSalary) return { status: 0, mess: 'Nhân viên chưa được thiết lập lương cơ bản' };
    const salary = await detailSalaryMd({ account: this.accountId, month: this.month });
    if (salary) return { status: 0, mess: `Nhân viên đã được tính công lương tháng ${this.month}` };
    return { status: 1 };
  }

  async run() {
    await this.setUp();
    const { status: statusValid, mess: messValid } = await this.valid();
    if (!statusValid) return { status: statusValid, mess: messValid };
    const holidays = this.salarySetup?.holidays;
    let day = { noSalary: 0, day: 0, annualLeave: 0, holiday: 0, regime: 0, compensatoryLeave: 0, nomal: 0, ot: 0 },
      soonLates = [],
      salaryCoefficient = 0;
    this.timekeepings.forEach((t) => {
      if (t.checkInTime || t.checkOutTime) day.day += roundNumber(t.totalWork);
      else if (holidays.includes(t.date)) day.holiday += t.totalWork;
      else if (t.applications?.length > 0) {
        let checked = false;
        t.applications.forEach((application) => {
          if (!checked) {
            if (application.type === 1) {
              day.annualLeave += t.totalWork;
              checked = true;
            } else if (application.type === 2) {
              day.noSalary += t.totalWork;
              checked = true;
            } else if (application.type === 3) {
              day.regime += t.totalWork;
              checked = true;
            }
          }
        });
      }
      if (t.soon || t.late) {
        const index = soonLates.findIndex((s) => s.date === t.date);
        const value = (roundNumber(t.soon) || 0) * 60 + (roundNumber(t.late) || 0) * 60;
        if (index >= 0) soonLates[index].value += value;
        else soonLates.push({ date: t.date, value });
      }
      salaryCoefficient += roundNumber(t.totalWork);
      if (t.summary && t.summary > 0) {
        if (t.type === 1) {
          day.nomal += roundNumber(t.totalWork);
        } else day.ot += roundNumber(t.summary);
      }
    });
    const numberDay = day.nomal;
    let allowanceAmount = 0;
    const bonuses = [];
    this.bonuses.forEach((b) => {
      bonuses.push({ name: b.name, summary: Math.round(b.type === 1 ? b.value : (b.value * this.baseSalary) / 100) });
    });
    const allowances = [];
    this.allowances.forEach((a) => {
      const summary = Math.round(a.type === 1 ? a.amount : (a.amount / salaryCoefficient) * numberDay);
      allowanceAmount += summary;
      allowances.push({
        name: a.name,
        value: a.amount,
        type: a.type,
        summary
      });
    });
    const bonusAmount = bonuses.reduce((a, b) => a + roundNumber(b.summary) || 0, 0);
    if (bonusAmount > 0) allowances.push({ name: 'Thưởng', summary: bonusAmount });
    const monneyOfDay = this.baseSalary / salaryCoefficient;
    const mandatoryz = this.salarySetup.mandatory;
    const bhxh = Math.round((this.baseSalary * mandatoryz.bhxh) / 100);
    const bhyt = Math.round((this.baseSalary * mandatoryz.bhyt) / 100);
    const bhtn = Math.round((this.baseSalary * mandatoryz.bhtn) / 100);
    const unionDues = Math.round((this.baseSalary * mandatoryz.unionDues) / 100);
    const soonLateConfigs = this.salarySetup.soonLate || [];
    if (soonLateConfigs?.length > 0) {
      soonLates.forEach((s) => {
        const soonLateConfig = soonLateConfigs.find((sc) => s.value >= sc.from && s.value <= sc.to);
        if (soonLateConfig) {
          if (soonLateConfig.type === 1) s.summary = Math.round(soonLateConfig.value) || 0;
          else s.summary = Math.round((soonLateConfig.value * monneyOfDay) / 100) || 0;
        } else s.summary = 0;
      });
    } else soonLates = soonLates.map((s) => ({ ...s, summary: 0 }));
    const officialSalary =
      Math.round((day.holiday + day.nomal + day.ot) * monneyOfDay) - soonLates.reduce((a, b) => a + roundNumber(b.summary) || 0, 0);
    const mandatoryAmount = bhxh + bhyt + bhtn + unionDues;
    const pretaxIncome = officialSalary - mandatoryAmount;
    const rates = this.taxSetup.taxs;
    const totalTax = pretaxIncome - this.taxSetup?.self - this.taxSetup?.dependent * this.dependent;
    const tax = {
      self: this.taxSetup?.self,
      dependent: { value: this.taxSetup?.dependent, quantity: this.dependent },
      total: totalTax > 0 ? totalTax : 0,
      rate: 0,
      summary: 0
    };
    rates.forEach((r) => {
      if (totalTax > 0 && r.from * 1000000 <= totalTax && r.to * 1000000 >= totalTax) {
        tax.rate = r.value;
        tax.summary = (totalTax * r.value) / 100;
      }
    });
    const params = {
      by: this.by,
      department: this.account?.department?._id,
      account: this.accountId,
      accountInfo: { type: this.account.type, salary: this.baseSalary },
      month: this.month,
      from: this.from,
      to: this.to,
      day,
      officialSalary,
      allowances,
      mandatory: {
        bhxh: { value: mandatoryz.bhxh, summary: bhxh },
        bhyt: { value: mandatoryz.bhyt, summary: bhyt },
        bhtn: { value: mandatoryz.bhtn, summary: bhtn },
        unionDues: { value: mandatoryz.unionDues, summary: unionDues }
      },
      mandatoryAmount,
      soonLates,
      bonuses,
      pretaxIncome,
      tax,
      summary: pretaxIncome - tax.summary
    };
    await createSalaryMd(params);
    return { status: true };
  }
}