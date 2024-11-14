import { getData } from '@/lib/axios';

export const getListNewApi = (params) => getData('/app/new/getListNew', params);
export const detailNewApi = (params) => getData('/app/new/detailNew', params);
