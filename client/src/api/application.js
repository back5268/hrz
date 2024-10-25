import { getData, putData } from '@lib/axios';

export const getListApplicationApi = (params) => getData('/web/application/getListApplication', params);
export const detailApplicationApi = (params) => getData('/web/application/detailApplication', params);
export const updateApplicationApi = (params) => putData('/web/application/updateApplication', params);
