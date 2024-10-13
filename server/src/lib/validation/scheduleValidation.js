export const listScheduleValid = {
  type: { type: 'number', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  shift: { type: 'string', allowNull: true },
  fromDate: { type: 'date', allowNull: true },
  toDate: { type: 'date', allowNull: true }
};

export const detailScheduleValid = {
  _id: 'string'
};

export const createScheduleValid = {
  departments: 'json',
  accounts: 'json',
  dates: 'json',
  timeStart: 'string',
  timeEnd: 'string',
  timeBreakStart: { type: 'string', allowNull: true },
  timeBreakEnd: { type: 'string', allowNull: true },
  totalTime: 'number',
  totalWork: 'number'
};
