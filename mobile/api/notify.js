import { getData, putData } from '@/lib/axios';

export const getListNotifyApi = (params) => getData('/app/notify/getListNotify', params);
export const viewAllNotifyApi = (params) => putData('/app/notify/viewAllNotify', params);
export const readNotifyApi = (params) => putData('/app/notify/readNotify', params);
export const readAllNotifyApi = (params) => putData('/app/notify/readAllNotify', params);

