export const listContractValid = {
  account: 'string',
  type: { type: 'number', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailContractValid = {
  account: 'string',
  _id: 'string'
};

export const updateContractValid = {
  account: 'string',
  _id: 'string',
  code: { type: 'string', allowNull: true },
  note: { type: 'string', allowNull: true },
  expiredDate: { type: 'date', allowNull: true },
  signedDate: { type: 'date', allowNull: true },
  template: { type: 'string', allowNull: true }
};

export const createContractValid = {
  account: 'string',
  code: 'string',
  type: 'number',
  signedDate: 'date',
  expiredDate: 'date',
  note: { type: 'string', allowNull: true }
};
