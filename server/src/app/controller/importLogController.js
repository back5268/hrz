import { getListImportLogService } from '@service';

export const getListImportLog = async (req, res) => {
  try {
    const data = await getListImportLogService(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};
