import { Redirect, Tabs, useSegments } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserState } from '@/store';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

const TabBar = (props) => {
  return (
    <BottomNavigation.Bar
      navigationState={props.state}
      safeAreaInsets={props.insets}
      onTabPress={({ route, preventDefault }) => {
        const event = props.navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          props.navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: props.state.key
          });
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = props.descriptors[route.key];
        if (options.tabBarIcon) {
          return options.tabBarIcon({ focused, color, size: 30 });
        }
        return null;
      }}
      getLabelText={({ route }) => {
        const { options } = props.descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.title;
        return label;
      }}
    />
  );
};

const TabsHeader = (props) => (
  <Appbar.Header {...props}>
    {props.navProps.options.headerLeft ? props.navProps.options.headerLeft({}) : undefined}
    <Appbar.Content title="Home" />
    {props.navProps.options.headerRight ? props.navProps.options.headerRight({}) : undefined}
  </Appbar.Header>
);

const TabLayout = () => {
  const { isAuthenticated } = useUserState();
  const segments = useSegments();
  const isShow = ["home", "other", "(other)"].includes(segments?.[2] ||segments?.[1] )
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      tabBar={(props) => isShow ? <TabBar {...props} /> : <></>}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: (props) => <TabsHeader navProps={props} children={undefined} />
      }}
    >
      <Tabs.Screen
        name="(main)"
        options={{
          title: 'Trang chủ',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="(other)"
        options={{
          title: 'Khác',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="format-list-bulleted" size={24} color={color} />
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
