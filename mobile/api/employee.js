import { getData } from '@/lib/axios';

export const getListEmployeeApi = (params) => getData('/app/employee/getListEmployee', params);
