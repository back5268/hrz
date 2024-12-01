import { getListNotifyApi, readAllNotifyApi, readNotifyApi } from '@/api';
import { useGetApi } from '@/lib/react-query';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Loadingz } from '@/components/core';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '@/theme';
import { Logo } from '@/components/base';
import { formatDate } from '@/lib/helper';
import { useRouter } from 'expo-router';

const Notify = () => {
  const router = useRouter();
  const [render, setRender] = useState(false);
  const { isLoading, data } = useGetApi(getListNotifyApi, { render }, 'notify');
  if (isLoading) return <Loadingz />;

  const onClickNoti = async (item) => {
    if (item.status !== 2) await readNotifyApi({ _id: item._id });
    setRender((pre) => !pre);
    switch (item.type) {
      case 1:
      case 2:
      case 3:
        return router.push(`/application/${item?.data._id}`);
      case 4:
        return router.push('/payroll');
      default:
        console.warn('Unhandled notification type:', item.type);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      {data?.length && (
        <Pressable
          onPress={async () => {
            await readAllNotifyApi();
            setRender((pre) => !pre);
          }}
        >
          <Text
            className="text-center border-b pb-2 font-semibold"
            style={{ borderColor: themeColor.secondary, color: themeColor.primary }}
          >
            Đánh dấu tất cả đã đọc
          </Text>
        </Pressable>
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id?.toString()}
        showsVerticalScrollIndicator={true}
        onEndReached={() => console.log('Load more data')}
        onRefresh={() => setRender((pre) => !pre)}
        refreshing={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onClickNoti(item)}
            className="rounded-md p-2 flex flex-row items-center border-b"
            style={{ backgroundColor: [0, 1].includes(item.status) ? themeColor.surfaceVariant : undefined }}
          >
            <View>
              <Logo imageClassName="h-16 w-16" />
            </View>
            <View className="flex flex-col ml-4">
              <Text className="font-semibold text-md mb-2">{item?.content}</Text>
              <Text className="text-md">{formatDate(item?.createdAt)}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default Notify;
