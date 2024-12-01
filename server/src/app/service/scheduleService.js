import { listScheduleValid } from '@lib/validation';
import { listTimekeepingMd } from '@repository';
import { validateData } from '@utils';

export const getListScheduleService = async (req) => {
  const { error, value } = validateData(listScheduleValid, req.query);
  if (error) throw new Error(error);
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
  return data
};
