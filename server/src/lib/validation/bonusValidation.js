export const listBonusValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  month: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true }
};

export const detailBonusValid = {
  _id: 'string'
};

export const updateBonusValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  month: { type: 'string', allowNull: true },
  departments: { type: 'json', allowNull: true },
  accounts: { type: 'json', allowNull: true },
  value: { type: 'number', allowNull: true },
};

export const createBonusValid = {
  name: 'string',
  month: 'string',
  departments: 'json',
  accounts: 'json',
  value: 'number',
};
