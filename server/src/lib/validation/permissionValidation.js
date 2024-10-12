export const listPermissionValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailPermissionValid = {
  _id: 'string'
};

export const updatePermissionValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  departments: { type: 'json', allowNull: true },
  positions: { type: 'json', allowNull: true },
  tools: { type: 'json', allowNull: true }
};

export const createPermissionValid = {
  name: 'string',
  description: { type: 'string', allowNull: true },
  departments: { type: 'json', allowNull: true },
  positions: { type: 'json', allowNull: true },
  tools: { type: 'json', allowNull: true }
};
