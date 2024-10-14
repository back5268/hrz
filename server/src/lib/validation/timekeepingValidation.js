export const listTimekeepingLogValid = {
  page: 'number',
  limit: 'number',
  shift: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  fromDate: 'date',
  toDate: 'date'
};

export const exportTimekeepingValid = {
  shift: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  fromDate: 'date',
  toDate: 'date'
};

export const listTimekeepingValid = {
  page: 'number',
  limit: 'number',
  shift: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  fromDate: 'date',
  toDate: 'date'
};

export const listSyntheticTimekeepingValid = {
  shift: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  fromDate: 'date',
  toDate: 'date'
};
