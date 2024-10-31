import { listScheduleValid } from '@lib/validation';
import { listTimekeepingMd } from '@models';
import { validateData } from '@utils';

export const getListSchedule = async (req, res) => {
  try {
    const { error, value } = validateData(listScheduleValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { type, department, account, shift, fromDate, toDate } = value;
    const where = {};
    if (type) where.type = type;
    if (department) where.department = department;
    if (account) where.account = account;
    if (shift) where.shift = shift;
    if (fromDate && toDate)
      where.date = {
        $gte: fromDate,
        $lte: toDate
      };
    const data = await listTimekeepingMd(where);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
