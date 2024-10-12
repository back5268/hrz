import { deleteData, getData, postData, putData } from '@lib/axios';

export const getListPersonnelApi = (params) => getData('/web/personnel/getListPersonnel', params);
export const getListWorkHistoryApi = (params) => getData('/web/personnel/getListWorkHistory', params);
export const detailPersonnelApi = (params) => getData('/web/personnel/detailPersonnel', params);
export const deletePersonnelApi = (params) => deleteData('/web/personnel/deletePersonnel', params);
export const createPersonnelApi = (params) => postData('/web/personnel/createPersonnel', params, true);
export const updatePersonnelApi = (params) => putData('/web/personnel/updatePersonnel', params, true);
export const resetPasswordApi = (params) => putData('/web/personnel/resetPassword', params);

export const getListContractApi = (params) => getData('/web/contract/getListContract', params);
export const deleteContractApi = (params) => deleteData('/web/contract/deleteContract', params);
export const createContractApi = (params) => postData('/web/contract/createContract', params);
export const updateContractApi = (params) => putData('/web/contract/updateContract', params);
export const cancelContractApi = (params) => putData('/web/contract/cancelContract', params);
export const renderContractApi = (params) => getData('/web/contract/renderContract', params);
