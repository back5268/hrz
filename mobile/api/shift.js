import { getData } from '@/lib/axios';

export const getListShiftApi = (params) => getData('/app/shift/getListShift', params, true);
