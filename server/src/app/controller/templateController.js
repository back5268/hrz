import { listTemplateValid, updateTemplateValid } from '@lib/validation';
import { countTemplateMd, detailTemplateMd, listTemplateMd, updateTemplateMd } from '@models';
import { validateData } from '@utils';

export const getListTemplate = async (req, res) => {
  try {
    const { error, value } = validateData(listTemplateValid, req.query);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { page, limit, keySearch, type } = value;
    const where = {};
    if (keySearch) where.$or = [{ subject: { $regex: keySearch, $options: 'i' } }];
    if (type) where.type = type;
    const documents = await listTemplateMd(where, page, limit);
    const total = await countTemplateMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const { error, value } = validateData(updateTemplateValid, req.body);
    if (error) return res.status(400).json({ status: 0, mess: error });
    const { _id } = value;
    const dataz = await detailTemplateMd({ _id });
    if (!dataz) return res.status(400).json({ status: 0, mess: 'Mẫu thông báo không tồn tại!' });
    const data = await updateTemplateMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
