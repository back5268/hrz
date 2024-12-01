import { salaryQueue } from '@lib/node-cron/salaryCr';
import { calculateSalaryValid, listSalaryLogValid } from '@lib/validation';
import { countSalaryLogMd, createSalaryLogMd, detailConfigMd, listBonusMd, listSalaryLogMd } from '@repository';
import { validateData } from '@utils';
import moment from 'moment';

export const getListSalaryLog = async (req, res) => {
  try {
    const { error, value } = validateData(listSalaryLogValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, status, month, fromDate, toDate } = value;
    const where = {};
    if (status) where.status = status;
    if (month) where.month = month;
    if (fromDate && toDate)
      where.createdAt = {
        $gte: fromDate,
        $lte: toDate
      };
    const documents = await listSalaryLogMd(where, page, limit);
    const total = await countSalaryLogMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const calculateSalary = async (req, res) => {
  try {
    const { error, value } = validateData(calculateSalaryValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { month, accounts, from, to } = value;
    const config = (await detailConfigMd({ type: 1 }))?.detail;
    const salarySetup = (await detailConfigMd({ type: 2 }))?.salary;
    const taxSetup = (await detailConfigMd({ type: 3 }))?.tax;
    const bonuses = await listBonusMd({ month });
    const debtLog = await createSalaryLogMd({
      by: req.account?._id,
      title: `Tính toán công lương ${moment().format('DD/MM/YYYY HH:mm:ss')}`,
      month,
      salarySetup,
      taxSetup,
      status: 1,
      from,
      to
    });
    salaryQueue.push({
      salaryLogId: debtLog._id,
      month,
      accounts,
      config,
      salarySetup,
      taxSetup,
      by: req.account?._id,
      from,
      to,
      bonuses
    }, true);
    res.json({ status: true, data: 1 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
