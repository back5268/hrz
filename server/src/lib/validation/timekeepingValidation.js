import { REGEX } from '@constant';

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

export const checkTimekeepingAppValid = {
  // shift: 'string',
  date: 'date',
  time: { type: 'string', pattern: REGEX.TIME },
  deviceName: 'string',
  latitude: 'string',
  longitude: 'string',
};

export const listTimekeepingLogAppValid = {
  date: 'date',
  // shift: 'string'
};

export const listTimekeepingAppValid = {
  fromDate: 'date',
  toDate: 'date',
  shift: { type: 'string', allowNull: true }
};
