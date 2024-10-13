import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListNotifyApi = (params) => getData('/web/notify/getListNotify', params);
export const detailNotifyApi = (params) => getData('/web/notify/detailNotify', params);
export const deleteNotifyApi = (params) => deleteData('/web/notify/deleteNotify', params);
export const createNotifyApi = (params) => postData('/web/notify/createNotify', params, true);
export const updateNotifyApi = (params) => putData('/web/notify/updateNotify', params, true);

export const getListLogApi = (params) => getData('/web/log/getListLog', params);
export const updateLogApi = (params) => putData('/web/log/updateLog', params);
