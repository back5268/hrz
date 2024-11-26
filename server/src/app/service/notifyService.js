import { listNotifyMd, updateNotifyMd } from '@models';

export const getListNotify = async (req, res) => {
  try {
    const where = { account: req.account?._id };
    const data = await listNotifyMd(where);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const viewAllNotify = async (req, res) => {
  try {
    await updateNotifyMd({ account: req.account?._id }, { status: 1 });
    res.status(201).json({ status: 1 });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const readNotify = async (req, res) => {
  try {
    const { _id } = req.body;
    await updateNotifyMd({ _id, account: req.account?._id }, { status: 2 });
    res.status(201).json({ status: 1 });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const readAllNotify = async (req, res) => {
  try {
    await updateNotifyMd({ account: req.account?._id }, { status: 2 });
    res.status(201).json({ status: 1 });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
