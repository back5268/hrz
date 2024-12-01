import {
  cancelApplicationService,
  createApplicationAdminService,
  createApplicationService,
  detailApplicationAppService,
  detailApplicationService,
  getListApplicationAppService,
  getListApplicationService,
  getListAppproveService,
  updateApplicationService
} from '@service';

export const getListApplication = async (req, res) => {
  try {
    const data = await getListApplicationService(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const getListAppprove = async (req, res) => {
  try {
    const data = await getListAppproveService(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const getListApplicationApp = async (req, res) => {
  try {
    const data = await getListApplicationAppService(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const detailApplication = async (req, res) => {
  try {
    const data = await detailApplicationService(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const detailApplicationApp = async (req, res) => {
  try {
    const data = await detailApplicationAppService(req);
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const data = await updateApplicationService(req);
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const cancelApplication = async (req, res) => {
  try {
    const data = await cancelApplicationService(req);
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const createApplication = async (req, res) => {
  try {
    const data = await createApplicationService(req);
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};

export const createApplicationAdmin = async (req, res) => {
  try {
    const data = await createApplicationAdminService(req);
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.message });
  }
};
