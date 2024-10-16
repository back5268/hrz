import { useUserState } from '@/store';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  const { isAuthenticated } = useUserState();
  if (isAuthenticated) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="forgot-password"
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
