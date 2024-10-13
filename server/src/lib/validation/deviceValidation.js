export const listDeviceValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true },
  department: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailDeviceValid = {
  _id: 'string'
};

export const updateDeviceValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true },
  location: { type: 'string', allowNull: true },
  ipAddress: { type: 'string', allowNull: true },
  departments: { type: 'json', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const createDeviceValid = {
  name: 'string',
  code: 'string',
  type: 'number',
  location: { type: 'string', allowNull: true },
  ipAddress: { type: 'string', allowNull: true },
  departments: { type: 'json', allowNull: true }
};
