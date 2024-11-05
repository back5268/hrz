import { getData, putData } from '@lib/axios';

export const getConfigApi = (params) => getData('/web/config/getConfig', params);
export const updateConfigApi = (params) => putData('/web/config/updateConfig', params, true);
