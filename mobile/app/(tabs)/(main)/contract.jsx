import { downloadContractApi, getListContractApi } from '@/api';
import { useGetApi } from '@/lib/react-query';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Iconz, Loadingz } from '@/components/core';
import { contractStatus, contractTypes } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { themeColor } from '@/theme';
import { formatDate } from '@/lib/helper';
import * as WebBrowser from 'expo-web-browser';
import { useUserState } from '@/store';

const Contract = () => {
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoading, data } = useGetApi(getListContractApi, { render }, 'contract');
  const { userInfo } = useUserState();
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
          const status = contractStatus.find((s) => s._id === item.status);

          return (
            <View
              className="rounded-md my-2 p-3 flex flex-row justify-between items-center mx-4"
              style={{ backgroundColor: themeColor.surfaceVariant }}
            >
              <View className="w-8/12">
                <Text className="font-semibold text-md uppercase mb-1">Số hiệu: {item.code}</Text>
                <Text className="leading-6">{contractTypes?.find((c) => c._id === item.type)?.name}</Text>
                <Text className="leading-6">
                  {formatDate(item.signedDate, 'date')} - {formatDate(item.expiredDate, 'date')}
                </Text>
                <View className="flex justify-center items-center rounded-md p-2 min-w-[100] mt-4" style={{ backgroundColor: status?.color }}>
                  <Text className="uppercase text-white font-semibold text-xs">{status?.name}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={async () => {
                  setLoading(true)
                  const response = await downloadContractApi({ _id: item._id, account: userInfo._id });
                  setLoading(false)
                  if (response) await WebBrowser.openBrowserAsync(response);
                }}
                className="flex justify-center items-center rounded-md p-2 min-w-[100]"
              >
                <View className="p-2 rounded-full border-2 border-primary">
                  <Iconz name="file-download-outline" />
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Contract;
