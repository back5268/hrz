import { getData, putData } from '@/lib/axios';

export const checkTimekeepingApi = (params) => putData('/app/timekeeping/checkTimekeeping', params, true);
export const getListTimekeepingApi = (params) => getData('/app/timekeeping/getListTimekeeping', params);
export const getListTimekeepingLogApi = (params) => getData('/app/timekeeping/getListTimekeepingLog', params);
export const getListSyntheticTimekeepingApi = (params) => getData('/app/timekeeping/getListSyntheticTimekeeping', params);
