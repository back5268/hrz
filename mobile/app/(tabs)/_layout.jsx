import { Redirect, Tabs, useSegments } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUserState } from '@/store';

const TabLayout = () => {
  const { isAuthenticated } = useUserState();
  const segments = useSegments();
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#673AB7',
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: ["home", "other", "(other)"].includes(segments?.[2] ||segments?.[1] ) ? { height: 56 } : { display: 'none' }
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
          tabBarIcon: ({ color, focused }) => <Ionicons name="list" color={color} size={24} />
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
