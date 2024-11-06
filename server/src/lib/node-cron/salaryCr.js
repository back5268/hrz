import { ArrayRedis } from '@lib/ioredis';
import { updateSalaryLogMd } from '@models';
import { Salary } from '@repository/SalaryCalculationRp';
import { ioSk } from 'src';

export const salaryQueue = new ArrayRedis("salaryQueue")
salaryQueue.callbackCron = async (data) => {
  const { salaryLogId, month, accounts, config, salarySetup, taxSetup, by, from, to, bonuses } = data;
  let error = 0,
    success = 0,
    detail = [];
  for (const account of accounts) {
    let value = {};
    const salary = new Salary({
      month,
      accountId: account,
      from,
      to,
      config,
      salarySetup,
      taxSetup,
      by,
      bonuses: bonuses.filter((b) => b.accounts?.includes(account))
    });
    value = await salary.run();
    const { status, mess } = value;
    detail.push({ account, from, to, mess, status: status ? 1 : 0 });
    if (status) success += 1;
    else error += 1;
  }
  await updateSalaryLogMd({ _id: salaryLogId }, { error, success, detail, status: 2 });
  ioSk.emit('calculateSalary', { time: Date.now() });
};
