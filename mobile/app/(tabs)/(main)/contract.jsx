import { getListContractApi } from '@/api';
import { useGetApi } from '@/lib/react-query';
import { FlatList, Image, Text, View } from 'react-native';
import { Loadingz } from '@/components/core';
import moment from 'moment';
import { contractTypes } from '@/constants';

const Employee = () => {
  const { isLoading, data } = useGetApi(getListContractApi, {}, 'contract');
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
          <View className="flex-row items-center justify-between p-4 border-border/20 bg-white my-2 rounded-lg">
            <View className="flex flex-row items-center justify-start">
              <View className="flex flex-col ml-4 font-lg">
                <Text className="text-lg font-medium mb-1">
                  Số hiệu: {item.code}
                </Text>
                <Text className="leading-6">Loại hợp đồng: {contractTypes?.find(c => c._id === item.type)?.name}</Text>
                <Text className="leading-6">Thời gian: {moment(item.signedDate).format("DD/MM/YYYY")} - {moment(item.expiredDate).format("DD/MM/YYYY")}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Employee;
