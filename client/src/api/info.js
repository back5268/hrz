import { getData } from '@lib/axios';

export const getListAccountInfoApi = (params) => getData('/info/getListAccountInfo', params);
