import { getListAccountInfoApi, getListApplicationApi, getListShiftInfoApi } from '@/api';
import { Loadingz } from '@/components/core';
import { applicationStatus, applicationTypes } from '@/constants';
import { formatDate } from '@/lib/helper';
import { useGetApi } from '@/lib/react-query';
import { themeColor } from '@/theme';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Application = () => {
  const [render, setRender] = useState(false);
  const { isLoading, data } = useGetApi(getListApplicationApi, { render }, 'application');
  const { data: shifts } = useGetApi(getListShiftInfoApi, {}, 'shifts');
  const { data: accounts } = useGetApi(getListAccountInfoApi, {}, 'accounts');
  if (isLoading) return <Loadingz />;

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={data}
        keyExtractor={(item, index) => (item._id ? item._id.toString() : `item-${index}`)}
        showsVerticalScrollIndicator={true}
        onEndReached={() => console.log('Load more data')}
        onRefresh={() => setRender((pre) => !pre)}
        refreshing={false}
        renderItem={({ item }) => {
          const type = applicationTypes.find((a) => a._id === item.type);
          const shift = shifts?.find((s) => s._id === item.shift);
          const status = applicationStatus.find((a) => a._id === item.status);
          const account = item.updatedBy ? accounts?.find((a) => a._id === item.updatedBy) || {} : {};
          const dates = item.dates;
          const dateTitle =
            dates.length > 1
              ? `${formatDate(dates[0], 'date')} - ${formatDate(dates[dates.length - 1], 'date')}`
              : formatDate(dates[0], 'date');

          return (
            <Pressable
              onPress={() => router.push(`/application/${item._id}`)}
              className="rounded-md my-2 p-3 flex flex-row justify-between items-center mx-4"
              style={{ backgroundColor: themeColor.surfaceVariant }}
            >
              <View className="w-8/12">
                <Text className="font-semibold text-md uppercase mb-1">{type?.name}</Text>
                {item.type !== 9 && (
                  <>
                    <Text className="leading-6">Ca làm việc: {shift?.name}</Text>
                    <Text className="leading-6">Ngày: {dateTitle}</Text>
                  </>
                )}
                <Text className="leading-6">Lý do tạo đơn: {item.reason}</Text>
                {item.updatedBy && (
                  <>
                    <Text className="leading-6">Ghi chú duyệt: {item.note}</Text>
                    <Text className="leading-6">Người duyệt: {account.fullName}</Text>
                    <Text className="leading-6">Thời gian duyệt: {formatDate(item.createdAt)}</Text>
                  </>
                )}
              </View>
              <View className="flex justify-center items-center rounded-md p-2 min-w-[80]" style={{ backgroundColor: status?.color }}>
                <Text className="uppercase text-white font-semibold text-xs">{status?.name}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Application;
