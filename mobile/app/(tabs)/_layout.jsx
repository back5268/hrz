import { Redirect, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUserState } from '@/store';

const TabLayout = () => {
  const { isAuthenticated } = useUserState();
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'rgba(0, 188, 212, 1)',
        headerStyle: {
          backgroundColor: '#25292e'
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          height: 56,
        }
      }}
    >
      <Tabs.Screen
        name="(main)"
        options={{
          title: 'Trang chủ',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        }}
      />
      <Tabs.Screen
        name="(other)"
        options={{
          title: 'Khác',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="list" color={color} size={24} />
          )
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
