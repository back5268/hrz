import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListPersonnelApi = (params) => getData('/web/personnel/getListPersonnel', params);
export const getListWorkHistoryApi = (params) => getData('/web/personnel/getListWorkHistory', params);
export const detailPersonnelApi = (params) => getData('/web/personnel/detailPersonnel', params);
export const deletePersonnelApi = (params) => deleteData('/web/personnel/deletePersonnel', params);
export const createPersonnelApi = (params) => postData('/web/personnel/createPersonnel', params, true);
export const updatePersonnelApi = (params) => putData('/web/personnel/updatePersonnel', params, true);
