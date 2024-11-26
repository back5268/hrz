import { uploadFileToFirebase } from '@lib/firebase';
import { getConfigValid, updateConfigValid } from '@lib/validation';
import { detailConfigMd, updateConfigMd } from '@models';
import { validateData } from '@utils';

export const getConfig = async (req, res) => {
  try {
    const { error, value } = validateData(getConfigValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { type } = value;
    const where = { type };
    const data = (await detailConfigMd(where)) || {};
    const object = type === 1 ? data.timekeeping : type === 2 ? data.salary : data.tax
    res.json({ status: 1, data: { updatedBy: data.updatedBy, ...object, note: data.note, files: data.files } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateConfig = async (req, res) => {
  try {
    const { error, value } = validateData(updateConfigValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { type, detail } = value;
    const params = { type, note: value.note, updatedBy: req.account._id };
    if (typeof detail !== 'object') return res.json({ status: 0, mess: 'Dữ liệu không đúng định dạng!' });
    if (type === 1) params.timekeeping = detail;
    if (type === 2) params.salary = detail;
    if (type === 3) params.tax = detail;
    if (value.files) params.files = Array.isArray(value.files) ? value.files : [];
    if (req.files?.['files']?.length > 0) {
      params.files = Array.isArray(params.files) ? params.files : [];
      for (const file of req.files['files']) {
        params.files.push(await uploadFileToFirebase(file));
      }
    }
    const data = await updateConfigMd({ type }, params);
    res.status(201).json({ status: 1, data });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
