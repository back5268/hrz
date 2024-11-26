import { listImportLogValid } from '@lib/validation';
import { countImportLogMd, listImportLogMd } from '@models';
import { validateData } from '@utils';

export const getListImportLog = async (req, res) => {
  try {
    const { error, value } = validateData(listImportLogValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
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
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
