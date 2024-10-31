import { getListNewApi } from '@/api';
import { useGetApi } from '@/lib/react-query';
import { FlatList, Image, Text, View } from 'react-native';
import { images } from '@/constants';
import { Loadingz } from '@/components/core';
import moment from 'moment';

const New = () => {
  const { isLoading, data } = useGetApi(getListNewApi, {}, 'new');
  if (isLoading) {
    return <Loadingz />;
  }

  return (
    <View className="flex-1 mx-4 py-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item._id?.toString()}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => (
          <View className="p-4 border-border/20 bg-white my-2 rounded-lg">
            <View className="flex flex-row items-start justify-start">
              <View className="w-20 h-20 rounded-lg flex justify-center items-center">
                <Image
                  source={item?.avatar ? { uri: item?.avatar } : images.avatar}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <View className="flex flex-col ml-4 font-lg">
                <Text className="text-lg font-medium mb-1">{item?.subject}</Text>
                <Text className="leading-6">Thời gian viết: {moment(item?.createedAt).format('DD/MM/YYYY HH:mm:ss')}</Text>
              </View>
            </View>
            <Text className="leading-6 mt-4 text-start" numberOfLines={5}>Mô tả: {item?.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default New;
