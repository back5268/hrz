export const listSalaryValid = {
  page: 'number',
  limit: 'number',
  month: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true }
};

export const detailSalaryValid = {
  _id: 'string'
};

export const updateStatusSalaryValid = {
  _id: 'string',
  status: 'number'
};
