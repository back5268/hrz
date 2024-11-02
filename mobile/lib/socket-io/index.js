import { io } from 'socket.io-client';
import { getStorage } from '../async-storage';

const URL = 'http://192.168.0.101:5000/';
export let socket;
const initializeSocket = async () => {
  const token = await getStorage('token');
  socket = io(URL, {
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
