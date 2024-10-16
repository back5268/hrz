import { getListEmployeeApi } from '@/api';
import { useGetApi } from '@/lib/react-query';
import { FlatList, Image, Text, View } from 'react-native';
import { images } from '@/constants';
import { Loadingz } from '@/components/core';

const Employee = () => {
  const { isLoading, data } = useGetApi(getListEmployeeApi, {}, 'employee');
  if (isLoading) {
    return <Loadingz />;
  }

  return (
    <View className="flex-1 mx-4 py-4">
      <Text className="mt-4 uppercase border-b text-lg font-semibold">{data?.[0]?.department?.name}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id?.toString()}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between p-4 border-border/20 bg-white my-2 rounded-lg">
            <View className="flex flex-row items-center justify-start">
              <View className="w-20 h-20 rounded-lg flex justify-center items-center">
                <Image
                  source={item?.avatar ? { uri: item?.avatar } : images.avatar}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <View className="flex flex-col ml-4 font-lg">
                <Text className="text-lg font-medium mb-1">
                  {item?.fullName} - {item?.staffCode}
                </Text>
                <Text className="leading-6">{item?.jobPosition?.name}</Text>
                <Text className="leading-6">Email: {item?.email}</Text>
                <Text className="leading-6">SĐT: {item?.phone}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Employee;
