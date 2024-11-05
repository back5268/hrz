export const getConfigValid = {
  type: 'number'
};

export const updateConfigValid = {
  type: 'number',
  detail: { type: 'json', allowNull: true },
  files: { type: 'json', allowNull: true },
  note: { type: 'string', allowNull: true }
};
