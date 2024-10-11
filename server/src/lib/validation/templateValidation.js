export const listTemplateValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  type: { type: 'number', allowNull: true }
};

export const updateTemplateValid = {
  _id: 'string',
  subject: { type: 'string', allowNull: true },
  content: { type: 'string', allowNull: true },
  description: { type: 'string', allowNull: true }
};
