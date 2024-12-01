import { io } from 'socket.io-client';
import { getStorage } from '../async-storage';
import { API_URL } from '@/constants';

export let socket;
const initializeSocket = async () => {
  const token = await getStorage('token');
  socket = io(API_URL, {
    query: { token },
    transports: ['websocket']
  });

  socket.on('connect', () => {
    console.log('Đã kết nối tới server');
  });

  socket.on('disconnect', () => {
    console.log('Đã ngắt kết nối từ server');
  });
};

initializeSocket();
