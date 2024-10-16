import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUserState } from '@/store';

const AuthLayout = () => {
  const { isAuthenticated } = useUserState();
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            headerShown: false
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
