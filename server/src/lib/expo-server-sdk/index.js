import Expo from 'expo-server-sdk';
const expo = new Expo();

export const pushNotification = async (token, message) => {
  const messageBody = {
    to: token,
    sound: 'default',
    body: message,
    data: { withSome: 'data' }
  };

  try {
    const ticket = await expo.sendPushNotificationsAsync([messageBody]);
    console.log('Thông báo đã được gửi:', ticket);
  } catch (error) {
    console.error('Lỗi khi gửi thông báo:', error);
  }
};
