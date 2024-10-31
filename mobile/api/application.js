import { deleteData, getData, postData } from '@/lib/axios';

export const getListApplicationApi = (params) => getData('/app/application/getListApplication', params);
export const detailApplicationApi = (params) => getData('/app/application/detailApplication', params);
export const createApplicationApi = (params) => postData('/app/application/createApplication', params, true);
export const cancelApplicationApi = (params) => deleteData('/app/application/cancelApplication', params);
