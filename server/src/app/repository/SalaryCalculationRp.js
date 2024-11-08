import { createSalaryMd, detailAccountMd, detailInsuranceMd, detailSalaryMd, listTimekeepingMd } from '@models';
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
    this.dependents = (await detailInsuranceMd({ account: this.accountId }))?.dependents?.length || 0;
    this.timekeepings = await listTimekeepingMd({ account: this.accountId, date: { $gte: this.from, $lte: this.to } });
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
    const timekeepingNomal = this.timekeepings?.filter((t) => t.type === 1);
    const timekeepingOt = this.timekeepings?.filter((t) => t.type === 2);
    let dayWorks = [],
      soonLates = [];
    this.timekeepings.forEach((t) => {
      if (t.checkInTime || t.checkOutTime) {
        const item = dayWorks.find((d) => d === t.date);
        if (!item) dayWorks.push(t.date);
      }
      if (t.soon || t.late) {
        const index = soonLates.findIndex((s) => s.date === t.date);
        const value = (roundNumber(t.soon) || 0) * 60 + (roundNumber(t.late) || 0) * 60;
        if (index >= 0) soonLates[index].value += value;
        else soonLates.push({ date: t.date, value });
      }
    });
    const numberDay = dayWorks.length;
    const salaryCoefficient = this.salarySetup?.salaryCoefficient;
    let allowanceAmount = 0;
    const allowances = [];
    this.allowances.forEach((a) => {
      const summary = Math.round(a.type === 1 ? a.amount : (a.amount / salaryCoefficient) * numberDay)
      allowanceAmount += summary;
      allowances.push({
        name: a.name,
        value: a.amount,
        type: a.type,
        summary
      });
    });
    const monneyOfDay = (this.baseSalary + allowanceAmount) / 26;
    const numberNomalWork = timekeepingNomal.reduce((a, b) => a + roundNumber(b.summary) || 0, 0);
    const numberOtWork = timekeepingOt.reduce((a, b) => a + roundNumber(b.summary) || 0, 0);
    const summaryNomalWork = Math.round(numberNomalWork * monneyOfDay);
    const summaryOtWork = Math.round(numberOtWork * monneyOfDay);
    const nomalWork = {
      total: timekeepingNomal.reduce((a, b) => a + roundNumber(b.totalWork) || 0, 0),
      number: numberNomalWork,
      summary: summaryNomalWork
    };
    const otWork = {
      total: timekeepingOt.reduce((a, b) => a + roundNumber(b.totalWork) || 0, 0),
      number: numberOtWork,
      summary: summaryOtWork
    };
    const mandatoryz = this.salarySetup.mandatory;
    const summaryWork = summaryNomalWork + summaryOtWork;
    const bhxh = Math.round((summaryWork * mandatoryz.bhxh) / 100);
    const bhyt = Math.round((summaryWork * mandatoryz.bhyt) / 100);
    const bhtn = Math.round((summaryWork * mandatoryz.bhtn) / 100);
    const unionDues = Math.round((summaryWork * mandatoryz.unionDues) / 100);

    const bonuses = [];
    this.bonuses.forEach((b) => {
      bonuses.push({ name: b.name, summary: Math.round(b.type === 1 ? b.value : (b.value * this.baseSalary) / 100) });
    });
    const soonLateConfigs = this.salarySetup.soonLate || [];
    if (soonLateConfigs?.length > 0) {
      soonLates.forEach((s) => {
        const soonLateConfig = soonLateConfigs.find((sc) => s.value >= sc.from && s.value <= sc.to);
        if (soonLateConfig) {
          if (soonLateConfig.type === 1) s.summary = Math.round(soonLateConfig.value);
          else s.summary = Math.round((soonLateConfig.value * monneyOfDay) / 100);
        }
      });
    } else soonLates = soonLates.map((s) => ({ ...s, summary: 0 }));
    const params = {
      by: this.by,
      account: this.accountId,
      department: this.account?.department?._id,
      month: this.month,
      from: this.from,
      to: this.to,
      baseSalary: this.baseSalary,
      numberDay,
      allowances,
      allowanceAmount,
      nomalWork,
      otWork,
      bhxhSalary: summaryWork,
      mandatory: {
        bhxh: { value: mandatoryz.bhxh, summary: bhxh },
        bhyt: { value: mandatoryz.bhyt, summary: bhyt },
        bhtn: { value: mandatoryz.bhtn, summary: bhtn },
        unionDues: { value: mandatoryz.unionDues, summary: unionDues }
      },
      mandatoryAmount: bhxh + bhyt + bhtn + unionDues,
      bonuses,
      summary:
        summaryWork + bonuses.reduce((a, b) => a + roundNumber(b.summary) || 0, 0) - soonLates.reduce((a, b) => a + roundNumber(b.summary) || 0, 0)
    };
    await createSalaryMd(params);
    return { status: true };
  }
}
