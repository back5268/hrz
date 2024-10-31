import { getListContractApi } from '@/api';
import { useGetApi } from '@/lib/react-query';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Loadingz } from '@/components/core';
import { contractStatus, contractTypes } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { themeColor } from '@/theme';
import { formatDate } from '@/lib/helper';

const Employee = () => {
  const [render, setRender] = useState(false);
  const { isLoading, data } = useGetApi(getListContractApi, { render }, 'contract');
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
        renderItem={({ item }) => {
          const status = contractStatus.find((s) => s._id === item.status);

          return (
            <Pressable
              className="rounded-md my-2 p-3 flex flex-row justify-between items-center mx-4"
              style={{ backgroundColor: themeColor.surfaceVariant }}
            >
              <View className="w-8/12">
                <Text className="font-semibold text-md uppercase mb-1">Số hiệu: {item.code}</Text>
                <Text className="leading-6">{contractTypes?.find((c) => c._id === item.type)?.name}</Text>
                <Text className="leading-6">
                  {formatDate(item.signedDate, 'date')} - {formatDate(item.expiredDate, 'date')}
                </Text>
              </View>
              <View className="flex justify-center items-center rounded-md p-2 min-w-[100]" style={{ backgroundColor: status?.color }}>
                <Text className="uppercase text-white font-semibold text-xs">{status?.name}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Employee;
