import { getData } from '@/lib/axios';

export const getListEmployeeApi = (params) => getData('/app/employee/getListEmployee', params);
export const getListContractApi = (params) => getData('/app/employee/getListContract', params);
export const downloadContractApi = (params) => getData('/app/employee/download', params);
