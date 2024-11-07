import { putData } from '@lib/axios';

export const updateConfigApi = (params) => putData('/web/config/updateConfig', params, true);
