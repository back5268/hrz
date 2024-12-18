import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import React, { Fragment } from 'react';
import { useUserState } from '@/store';
import { removeStorage } from '@/lib/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Hrz, Iconz } from '@/components/core';
import { images } from '@/constants';

const Other = () => {
  const { userInfo, clearUserInfo } = useUserState();
  const router = useRouter();
  const logout = async () => {
    clearUserInfo();
    removeStorage('token');
    router.replace('/sign-in');
  };

  const showAlert = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có chắc chắn muốn đăng xuất',
      [
        {
          text: 'Hủy',
          style: 'cancel'
        },
        { text: 'Xác nhận', onPress: () => logout() }
      ],
      { cancelable: false }
    );
  };

  const items = [
    { label: 'Thông tin cá nhân', icon: 'card-account-details', onPress: () => router.push('/account') },
    { label: 'Bảng công', icon: 'briefcase-clock', onPress: () => router.push('/timekeeping') },
    { label: 'Bảng lương', icon: 'credit-card', onPress: () => router.push('/payroll') },
    { label: 'Đơn từ', icon: 'archive', onPress: () => router.push('/application') },
    { label: 'Đổi mật khẩu', icon: 'key-change', onPress: () => router.push('/change-password') },
    { label: 'Đăng xuất', icon: 'logout', onPress: showAlert }
  ];

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full px-6">
        <View className="flex flex-row items-center justify-start my-16 ml-8">
          <View className="w-20 h-20 rounded-lg flex justify-center items-center">
            <Image
              source={userInfo?.avatar ? { uri: userInfo?.avatar } : images.avatar}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex flex-col ml-4 font-lg">
            <Text className="text-lg font-medium mb-1">{userInfo?.fullName}</Text>
            <Text className="text-nomal">{userInfo?.email}</Text>
            <Text className="text-nomal">{userInfo?.phone}</Text>
          </View>
        </View>
        <Hrz />
        {items.map((item, index) => (
          <Fragment key={index}>
            <TouchableOpacity onPress={item.onPress} className="flex flex-row w-full justify-between items-center py-4 px-4">
              <View className="flex flex-row items-center">
                <Iconz size={20} name={item.icon} />
                <Text className="text-base ml-4">{item.label}</Text>
              </View>
              <Iconz size={20} name="chevron-right" />
            </TouchableOpacity>
            <Hrz />
          </Fragment>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Other;
