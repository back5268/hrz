import { getData } from '@lib/axios';

export const getListScheduleApi = (params) => getData('/web/schedule/getListSchedule', params);
