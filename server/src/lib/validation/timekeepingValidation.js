import { REGEX } from '@constant';

export const listTimekeepingLogValid = {
  page: 'number',
  limit: 'number',
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  fromDate: 'string',
  toDate: 'string'
};

export const exportTimekeepingValid = {
  shift: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  fromDate: 'string',
  toDate: 'string'
};

export const listTimekeepingValid = {
  page: 'number',
  limit: 'number',
  shift: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  fromDate: 'string',
  toDate: 'string'
};

export const listSyntheticTimekeepingValid = {
  shift: { type: 'string', allowNull: true },
  department: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  fromDate: 'string',
  toDate: 'string'
};

export const checkTimekeepingAppValid = {
  date: 'string',
  time: { type: 'string', pattern: REGEX.TIME },
  deviceName: 'string',
  latitude: 'string',
  longitude: 'string',
};

export const listTimekeepingLogAppValid = {
  date: 'string',
};

export const listTimekeepingAppValid = {
  fromDate: 'string',
  toDate: 'string',
  shift: { type: 'string', allowNull: true }
};
