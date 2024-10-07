import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListPositionApi = (params) => getData('/web/positions/getListPosition', params);
export const deletePositionApi = (params) => deleteData('/web/positions/deletePosition', params);
export const createPositionApi = (params) => postData('/web/positions/createPosition', params, true);
export const updatePositionApi = (params) => putData('/web/positions/updatePosition', params, true);
