import { listLogValid } from '@lib/validation';
import { countLogMd, listLogMd } from '@repository';
import { validateData } from '@utils';

export const getListLogService = async (req) => {
  const { error, value } = validateData(listLogValid, req.query);
  if (error) throw new Error(error);
  const { page, limit, keySearch, status } = value;
  const where = {};
  if (keySearch) where.$or = [{ subject: { $regex: keySearch, $options: 'i' } }, { to: { $regex: keySearch, $options: 'i' } }];
  if (status || status === 0) where.status = status;
  const documents = await listLogMd(where, page, limit);
  const total = await countLogMd(where);
  return { documents, total };
};
