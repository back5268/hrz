export const listApplicationValid = {
  page: 'number',
  limit: 'number',
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  type: { type: 'number', allowNull: true },
  fromDate: { type: 'date', allowNull: true },
  tpDate: { type: 'date', allowNull: true }
};

export const detailApplicationValid = {
  _id: 'string'
};

export const updateApplicationValid = {
  _id: 'string',
  status: { type: 'number', allowNull: true }
};

export const createApplicationValid = {
  department: 'string',
  account: 'string',
  shift: 'string',
  type: 'number',
  detail: 'json',
  reason: 'string'
};

export const listApplicationAppValid = {
  status: { type: 'number', allowNull: true },
  type: { type: 'number', allowNull: true },
  fromDate: { type: 'date', allowNull: true },
  tpDate: { type: 'date', allowNull: true }
};
