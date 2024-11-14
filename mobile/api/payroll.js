import { getData } from '@/lib/axios';

export const getListPayrollApi = (params) => getData('/app/payroll/getListSalary', params);
export const previewPayrollApi = (params) => getData('/app/payroll/preview', params);
export const downloadPayrollApi = (params) => getData('/app/payroll/download', params);

