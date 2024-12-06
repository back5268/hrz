import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const requestNotificationPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('Bạn cần cấp quyền để nhận thông báo!');
    return;
  }
  return (await Notifications.getExpoPushTokenAsync()).data;
};
