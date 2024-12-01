import { getListScheduleService } from '@service';

export const getListSchedule = async (req, res) => {
  try {
    const data = await getListScheduleService(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};
