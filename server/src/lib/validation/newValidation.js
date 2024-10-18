export const listNewValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailNewValid = {
  _id: 'string'
};

export const updateNewValid = {
  _id: 'string',
  subject: { type: 'string', allowNull: true },
  content: { type: 'string', allowNull: true },
  files: { type: 'json', allowNull: true },
  avatar: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true },
  departments: { type: 'json', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const createNewValid = {
  subject: 'string',
  content: 'string',
  departments: { type: 'json', allowNull: true },
  description: { type: 'string', allowNull: true },
};
