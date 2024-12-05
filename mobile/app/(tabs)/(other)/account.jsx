import { Image, ScrollView, Text, View } from 'react-native';
import React, { Fragment } from 'react';
import { useUserState } from '@/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { convertNumberToString, formatDate, formatNumber } from '@/lib/helper';
import { getListBankInfoApi } from '@/api';
import { useGetApi } from '@/lib/react-query';

const Account = () => {
  const { userInfo } = useUserState();
  const { data: banks } = useGetApi(getListBankInfoApi, {}, 'banks');
  const items = [
    `Mã nhân viên: ${userInfo?.staffCode}`,
    `Ngày sinh: ${formatDate(userInfo?.birthday, 'date')}`,
    `CMTND: ${userInfo?.cmt}`,
    `Ngày cấp CMTND: ${formatDate(userInfo?.dateOfIssue, 'date')}`,
    `Nơi cấp: ${userInfo?.placeOfIssue}`,
    `Địa chỉ thường trú: ${userInfo?.address}`,
    `Phòng ban: ${userInfo?.department?.name}`,
    `Chức vụ: ${userInfo?.position?.name}`,
    `Vị trí công việc: ${userInfo?.jobPosition?.name}`,
    `Ngày vào: ${formatDate(userInfo?.dateIn, 'date')}`,
    `Số tài khoản: ${userInfo?.bankAccount}`,
    `Ngân hàng: ${banks?.find((b) => b._id === userInfo?.bank)?.name}`,
    `Lương cơ bản: ${formatNumber(userInfo?.salary)}`,
    `Bằng chữ: ${convertNumberToString(userInfo?.salary)}`
  ];

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View className="w-full px-6">
          <View className="flex flex-row items-center justify-start mb-12 ml-8">
            <View className="w-20 h-20 rounded-lg flex justify-center items-center">
              <Image
                source={!userInfo?.avatar ? { uri: userInfo?.avatar } : images.avatar}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>
            <View className="flex flex-col ml-4 font-lg">
              <Text className="text-lg font-medium mb-1">{userInfo?.fullName}</Text>
              <Text className="text-nomal my-1">{userInfo?.email}</Text>
              <Text className="text-nomal my-1">{userInfo?.phone}</Text>
            </View>
          </View>
          {items.map((item, index) => (
            <Fragment key={index}>
              <Text className="text-base my-2 border-b border-dashed pb-2">{item}</Text>
            </Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
