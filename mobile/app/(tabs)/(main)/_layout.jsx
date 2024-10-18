import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUserState } from '@/store';
import { Text, TouchableOpacity } from 'react-native';

const MainLayout = () => {
  const { isAuthenticated } = useUserState();
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  const HeaderButton = () => (
    <TouchableOpacity
      onPress={() => {
        console.log('Button Pressed');
      }}
      style={{ marginRight: 15 }}
    >
      <Text style={{ fontWeight: 'bold' }}>Action</Text>
    </TouchableOpacity>
  );

  const items = [
    { title: 'Nhân viên', name: 'employee' },
    { title: 'Hợp đồng', name: 'contract' },
    { title: 'Tin tức', name: 'new' },
    { title: 'Bảng công', name: 'timekeeping' },
    { title: 'Bảng lương', name: 'payroll' },
    { title: 'Thông báo', name: 'notify' },
    { title: 'Chấm công', name: 'check-timekeeping' },
    { title: 'Đơn từ', name: 'application', headerRight: () => <HeaderButton /> }
  ];

  return (
    <>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        {items.map((item, index) => (
          <Stack.Screen
            key={index}
            name={item.name}
            options={{
              title: item.title,
              headerTitleStyle: {
                fontSize: 18
              },
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              headerRight: item.headerRight
            }}
          />
        ))}
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default MainLayout;
