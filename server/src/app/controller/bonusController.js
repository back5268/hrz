import { createBonusService, deleteBonusService, getListBonusService, updateBonusService } from '@service';

export const getListBonus = async (req, res) => {
  try {
    const data = await getListBonusService(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteBonus = async (req, res) => {
  try {
    const data = await deleteBonusService(req);
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailBonus = async (req, res) => {
  try {
    const data = await detailBonus(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateBonus = async (req, res) => {
  try {
    const data = await updateBonusService(req);
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createBonus = async (req, res) => {
  try {
    const data = await createBonusService(req);
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};
