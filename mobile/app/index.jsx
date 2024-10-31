import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { useUserState } from '@/store';
import { useEffect } from 'react';
import { Buttonz } from '@/components/core';

const Welcome = () => {
  const { isAuthenticated } = useUserState();
  if (isAuthenticated) return <Redirect href="/home" />;

  useEffect(() => {
    const timer = setTimeout(() => router.push('/sign-in'), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%'
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image source={images.logoz} className="w-48 h-48" resizeMode="contain" />
          <View className="relative mb-4">
            <Text className="text-xl text-primary font-bold text-center">
              Phần mềm quản lý nhân sự <Text className="text-secondary-200">Hrz</Text>
            </Text>
            <Image source={images.path} className="w-[40px] h-[20px] absolute -bottom-3 -right-1" resizeMode="contain" />
          </View>
          <Image source={images.cards} className="max-w-[380px] w-full h-[298px]" resizeMode="contain" />
          <View className="w-6/12">
            <Buttonz label="Đăng nhập" onPress={() => router.push('/sign-in')} />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
