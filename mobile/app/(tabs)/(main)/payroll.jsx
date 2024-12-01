import { downloadPayrollApi, getListPayrollApi } from '@/api';
import { useGetApi } from '@/lib/react-query';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Iconz, Loadingz } from '@/components/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { themeColor } from '@/theme';
import { formatDate, formatNumber } from '@/lib/helper';
import * as WebBrowser from 'expo-web-browser';
import { router } from 'expo-router';

const Payroll = () => {
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoading, data } = useGetApi(getListPayrollApi, { render }, 'payroll');
  if (isLoading || loading) return <Loadingz />;

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={data}
        keyExtractor={(item) => item._id?.toString()}
        showsVerticalScrollIndicator={true}
        onEndReached={() => console.log('Load more data')}
        onRefresh={() => setRender((pre) => !pre)}
        refreshing={false}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => router.push(`/payroll/${item._id}`)}
              className="rounded-md my-2 p-3 flex flex-row justify-between items-center mx-4"
              style={{ backgroundColor: themeColor.surfaceVariant }}
            >
              <View className="w-9/12">
                <Text className="font-semibold text-md uppercase mb-1">Phiếu lương tháng: {item.month}</Text>
                <Text className="leading-6">Số tiền: {formatNumber(item.summary)} VNĐ</Text>
                <Text className="leading-6">
                  Thời gian: {formatDate(item.from, 'date')} - {formatDate(item.to, 'date')}
                </Text>
                <Text className="leading-6">Ngày duyệt: {formatDate(item.updatedAt, 'date')}</Text>
              </View>
              <TouchableOpacity
                onPress={async () => {
                  setLoading(true);
                  const response = await downloadPayrollApi({ _id: item._id });
                  setLoading(false);
                  if (response) await WebBrowser.openBrowserAsync(response);
                }}
                className="flex justify-center items-center rounded-md p-2 min-w-[100]"
              >
                <View className="p-2 rounded-full border-2 border-primary">
                  <Iconz name="file-download-outline" />
                </View>
              </TouchableOpacity>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Payroll;
