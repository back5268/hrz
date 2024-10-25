export const listImportLogValid = {
  page: 'number',
  limit: 'number',
  fromDate: 'date',
  toDate: 'date',
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};
