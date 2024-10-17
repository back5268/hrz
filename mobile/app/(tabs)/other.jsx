import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import React, { Fragment } from 'react';
import { useUserState } from '@/store';
import { removeStorage } from '@/lib/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Hrz, Iconz } from '@/components/core';
import { images } from "@/constants";

const Item = ({ label, icon, onPress }) => {
  return (
    <Fragment>
      <TouchableOpacity onPress={onPress} className="flex flex-row w-full justify-between items-center py-4 px-4">
        <View className="flex flex-row items-center">
          <Iconz size={20} name={icon} />
          <Text className="text-base ml-4">{label}</Text>
        </View>
        <Iconz size={20} name="chevron-right" />
      </TouchableOpacity>
      <Hrz />
    </Fragment>
  );
};

const Other = () => {
  const { userInfo, clearUserInfo } = useUserState();
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
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Xác nhận', onPress: () => logout() }
      ],
      { cancelable: false }
    );
  };

  const items = [
    { label: 'Thông tin cá nhân', icon: 'user' },
    { label: 'Bảng công', icon: 'clipboard' },
    { label: 'Bảng lương', icon: 'clipboard' },
    { label: 'Đơn từ', icon: 'clipboard' },
    { label: 'Đổi mật khẩu', icon: 'refresh-ccw' },
    { label: 'Đăng xuất', icon: 'log-out', onPress: showAlert }
  ];

  return (
    <SafeAreaView className="h-full">
      <View className="w-full px-4">
        <View className="flex flex-row items-center justify-start my-16 ml-8">
          <View className="w-20 h-20 border border-secondary rounded-lg flex justify-center items-center">
            <Image source={userInfo?.avatar ? { uri: userInfo?.avatar } :  images.avatar} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover" />
          </View>
          <View className="flex flex-col ml-4 font-lg">
            <Text className="text-lg font-medium mb-1">{userInfo?.fullName}</Text>
            <Text className="text-nomal">{userInfo?.email}</Text>
            <Text className="text-nomal">{userInfo?.phone}</Text>
          </View>
        </View>
        <Hrz />
        {items.map((item, index) => (
          <Item label={item.label} icon={item.icon} key={index} onPress={item.onPress} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Other;
