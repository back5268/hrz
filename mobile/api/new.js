import { getData } from '@/lib/axios';

export const getListNewApi = (params) => getData('/app/new/getListNew', params);
