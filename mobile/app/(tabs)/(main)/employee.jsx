import { getListEmployeeApi } from '@/api';
import { useGetApi } from '@/lib/react-query';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { images } from '@/constants';

const Item = ({ item }) => {
  return (
    <View className="flex-row items-center justify-between p-4 border-border/20 bg-white my-4 rounded-lg">
      <View className="flex flex-row items-center justify-start">
        <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
          <Image source={item?.avatar ? { uri: item?.avatar } : images.avatar} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover" />
        </View>
        <View className="flex flex-col ml-4 font-lg">
          <Text className="text-lg font-medium mb-1">
            {item?.fullName} - {item?.staffCode}
          </Text>
          <Text className="text-nomal">{item?.jobPosition?.name}</Text>
          <Text className="text-nomal">Email: {item?.email}</Text>
          <Text className="text-nomal">SĐT: {item?.phone}</Text>
        </View>
      </View>
    </View>
  );
};

const Employee = () => {
  const { isLoading, data } = useGetApi(getListEmployeeApi, {}, 'employee');
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="flex-1 mx-4">
      <Text className="mt-4 uppercase border-b text-lg font-semibold">{data?.[0]?.department?.name} Phòng nhân sự</Text>
      <FlatList data={data} keyExtractor={(item) => item._id?.toString()} renderItem={Item} />
    </View>
  );
};

export default Employee;
