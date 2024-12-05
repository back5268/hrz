export const listSalaryValid = {
  page: 'number',
  limit: 'number',
  month: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailSalaryValid = {
  _id: 'string'
};

export const updateStatusSalaryValid = {
  _ids: 'json',
  status: 'number'
};

export const sendSalaryValid = {
  _ids: 'json'
};

export const handleSalaryValid = {
  _id: 'string',
  status: 'number',
  reason: { type: 'string', allowNull: true }
};

export const exportSalaryValid = {
  month: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};
