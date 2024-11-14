import { getStorage } from '@/lib/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const clientApi = axios.create({
  // baseURL: 'http://api.backz.s-tech.info/',
  baseURL: 'http://192.168.6.54:5000/',
  timeout: 10000
});

clientApi.interceptors.request.use(
  async (config) => {
    config.headers['Bearer'] = await getStorage('token');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

clientApi.interceptors.response.use(
  async function (res) {
    if (res.data?.status || res.data?.status === 0) {
      if (res.data?.status) return res.data.data;
      else Toast.show({ type: 'error', text2: res.data?.mess });
    } else return res.data;
  },
  async function (error) {
    console.log(error);
    
    if (error) {
      Toast.show({
        type: 'error',
        text2: error?.response?.data?.mess || 'Đường truyền không ổn định!'
      });
    }
  }
);
