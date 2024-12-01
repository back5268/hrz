import { getData, putData } from '@/lib/axios';

export const getListPayrollApi = (params) => getData('/app/payroll/getListSalary', params);
export const detailPayrollApi = (params) => getData('/app/payroll/detailSalary', params);
export const previewPayrollApi = (params) => getData('/app/payroll/preview', params);
export const downloadPayrollApi = (params) => getData('/app/payroll/download', params);
export const handleSalaryApi = (params) => putData('/app/payroll/handleSalary', params);

