import { listImportLogValid } from '@lib/validation';
import { countImportLogMd, listImportLogMd } from '@repository';
import { validateData } from '@utils';

export const getListImportLogService = async (req) => {
  const { error, value } = validateData(listImportLogValid, req.query);
  if (error) throw new Error(error);
  const { page, limit, status, keySearch, fromDate, toDate } = value;
  const where = {};
  if (status || status === 0) where.status = status;
  if (keySearch)
    where.$or = [
      { deviceCode: { $regex: keySearch, $options: 'i' } },
      { staffCode: { $regex: keySearch, $options: 'i' } },
      { shiftCode: { $regex: keySearch, $options: 'i' } }
    ];
  where.createdAt = {
    $gte: fromDate,
    $lte: toDate
  };
  const documents = await listImportLogMd(where, page, limit);
  const total = await countImportLogMd(where);
  return { documents, total };
};
