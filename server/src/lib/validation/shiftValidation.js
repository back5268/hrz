export const listShiftValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailShiftValid = {
  _id: 'string'
};

export const updateShiftValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  dateStart: { type: 'date', allowNull: true },
  dateEnd: { type: 'date', allowNull: true },
  dates: { type: 'json', allowNull: true },
  departments: { type: 'json', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const createShiftValid = {
  name: 'string',
  code: 'string',
  dateStart: 'date',
  dateEnd: { type: 'date', allowNull: true },
  dates: { type: 'json', allowNull: true },
  departments: { type: 'json', allowNull: true },
};
