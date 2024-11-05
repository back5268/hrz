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
  status: { type: 'number', allowNull: true },
  note: { type: 'string', allowNull: true },
};

export const createApplicationValid = {
  shift: 'string',
  type: 'number',
  dates: 'json',
  reason: 'string',
  fromTime: { type: 'string', allowNull: true },
  toTime: { type: 'string', allowNull: true },
  late: { type: 'string', allowNull: true },
  soon: { type: 'string', allowNull: true }
};

export const createApplicationAdminValid = {
  department: 'string',
  account: 'string',
  shift: 'string',
  type: 'number',
  dates: 'json',
  reason: 'string',
  fromTime: { type: 'string', allowNull: true },
  toTime: { type: 'string', allowNull: true },
  late: { type: 'string', allowNull: true },
  soon: { type: 'string', allowNull: true }
};

export const listApplicationAppValid = {
  status: { type: 'number', allowNull: true },
  type: { type: 'number', allowNull: true },
  fromDate: { type: 'date', allowNull: true },
  toDate: { type: 'date', allowNull: true }
};
