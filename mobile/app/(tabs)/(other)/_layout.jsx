import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUserState } from '@/store';

const OtherLayout = () => {
  const { isAuthenticated } = useUserState();
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  const items = [
    { title: 'Đổi mật khẩu', name: 'change-password' }
  ];

  return (
    <>
      <Stack>
        <Stack.Screen name="other" options={{ headerShown: false }} />
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
              headerShadowVisible: false
            }}
          />
        ))}
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default OtherLayout;
