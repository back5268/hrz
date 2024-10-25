import { getStorage } from '@/lib/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const clientApi = axios.create({
  baseURL: 'http://192.168.6.199:5000/',
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
    if (res.data?.status) return res.data.data;
    else return res.data;
  },
  async function (error) {
    if (error) {
      Toast.show({
        type: 'error',
        text2: error?.response?.data?.mess || 'Đường truyền không ổn định!'
      });
    }
  }
);
