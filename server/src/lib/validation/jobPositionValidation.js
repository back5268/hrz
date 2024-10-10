export const listJobPositionValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailJobPositionValid = {
  _id: 'string'
};

export const updateJobPositionValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  minSalary: { type: 'number', allowNull: true },
  maxSalary: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const createJobPositionValid = {
  name: 'string',
  code: 'string',
  description: { type: 'string', allowNull: true },
  minSalary: 'number',
  maxSalary: 'number'
};
