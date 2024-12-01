import { getListLogService } from '@service';

export const getListLog = async (req, res) => {
  try {
    const data = await getListLogService(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};
