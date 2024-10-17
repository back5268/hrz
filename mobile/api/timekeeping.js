import { postData } from '@/lib/axios';

export const checkTimekeepingApi = (params) => postData('/app/timekeeping/checkTimekeeping', params, true);
