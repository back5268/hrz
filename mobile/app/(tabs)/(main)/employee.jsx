import { getListEmployeeApi } from '@/api';
import { useGetApi } from '@/lib/react-query';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { images } from '@/constants';
import { Loadingz } from '@/components/core';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '@/theme';

const Employee = () => {
  const [render, setRender] = useState(false);
  const { isLoading, data } = useGetApi(getListEmployeeApi, { render }, 'employee');
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
            className="rounded-md my-2 p-3 flex flex-row justify-between items-center mx-4"
            style={{ backgroundColor: themeColor.surfaceVariant }}
          >
            <View className="w-20 h-20 rounded-lg flex justify-center items-center">
              <Image
                source={item?.avatar ? { uri: item?.avatar } : images.avatar}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>
            <View className="flex flex-col w-8/12">
              <Text className="font-semibold text-md uppercase mb-1">
                {item?.fullName} - {item?.staffCode}
              </Text>
              <Text className="leading-6" numberOfLines={2}>
                {item?.jobPosition?.name}
              </Text>
              <Text className="leading-6" numberOfLines={2}>
                Email: {item?.email}
              </Text>
              <Text className="leading-6" numberOfLines={2}>
                SĐT: {item?.phone}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default Employee;
