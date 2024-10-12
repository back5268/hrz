export const listNotifyValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailNotifyValid = {
  _id: 'string'
};

export const updateNotifyValid = {
  _id: 'string',
  subject: { type: 'string', allowNull: true },
  content: { type: 'string', allowNull: true },
  files: { type: 'json', allowNull: true },
  departments: { type: 'json', allowNull: true },
  accounts: { type: 'json', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const createNotifyValid = {
  subject: 'string',
  content: 'string',
  departments: { type: 'json', allowNull: true },
  accounts: { type: 'json', allowNull: true }
};
