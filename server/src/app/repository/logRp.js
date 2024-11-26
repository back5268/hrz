import { listLogValid } from '@lib/validation';
import { countLogMd, listLogMd } from '@models';
import { validateData } from '@utils';

export const getListLog = async (req, res) => {
  try {
    const { error, value } = validateData(listLogValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ subject: { $regex: keySearch, $options: 'i' } }, { to: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await listLogMd(where, page, limit);
    const total = await countLogMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
