export const listSalaryLogValid = {
  page: 'number',
  limit: 'number',
  status: { type: 'number', allowNull: true },
  fromDate: { type: 'string', allowNull: true },
  toDate: { type: 'string', allowNull: true },
  month: { type: 'string', allowNull: true }
};

export const calculateSalaryValid = {
  page: 'number',
  limit: 'number',
  status: { type: 'number', allowNull: true },
  fromDate: { type: 'string', allowNull: true },
  toDate: { type: 'string', allowNull: true },
  month: { type: 'string', allowNull: true }
};
