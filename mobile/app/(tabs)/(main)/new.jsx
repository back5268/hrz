import { getListNewApi } from '@/api';
import { useGetApi } from '@/lib/react-query';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { images } from '@/constants';
import { Loadingz } from '@/components/core';
import moment from 'moment';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '@/theme';
import { router } from 'expo-router';

const New = () => {
  const [render, setRender] = useState(false);
  const { isLoading, data } = useGetApi(getListNewApi, { render }, 'new');
  if (isLoading) return <Loadingz />;

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={data}
        keyExtractor={(item) => item._id?.toString()}
        showsVerticalScrollIndicator={true}
        onEndReached={() => console.log('Load more data')}
        onRefresh={() => setRender((pre) => !pre)}
        refreshing={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/new/${item._id}`)}
            className="rounded-md p-3 mx-4 my-2"
            style={{ backgroundColor: themeColor.surfaceVariant }}
          >
            <View className="flex flex-row justify-between items-center">
              <View className="w-20 h-20 rounded-lg flex justify-center items-center">
                <Image
                  source={item?.avatar ? { uri: item?.avatar } : images.avatar}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <View className="w-8/12">
                <Text className="font-semibold text-md uppercase mb-1">{item?.subject}</Text>
                <Text className="leading-6">Thời gian viết: {moment(item?.createedAt).format('DD/MM/YYYY HH:mm:ss')}</Text>
              </View>
            </View>
            <Text className="leading-6 mt-4 text-start" numberOfLines={5}>
              Mô tả: {item?.description}
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default New;
