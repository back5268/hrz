export const listPositionValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailPositionValid = {
  _id: 'string'
};

export const updatePositionValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  allowances: { type: 'json', allowNull: true }
};

export const createPositionValid = {
  name: 'string',
  code: 'string',
  description: { type: 'string', allowNull: true },
  allowances: { type: 'json', allowNull: true }
};
