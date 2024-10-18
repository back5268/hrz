import { getListTimekeepingLogApi } from '@/api/timekeeping';
import { Hrz, Loadingz } from '@/components/core';
import moment from 'moment';
import { FlatList, Text, View } from 'react-native';
import { Checking, CheckTimekeepingResult } from '@/components/check-timekeeping';
import { useState } from 'react';
import { useGetApi } from '@/lib/react-query';

const CheckTimekeeping = () => {
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const { isLoading, data } = useGetApi(
    getListTimekeepingLogApi,
    { date: moment().format('YYYY-MM-DD'), render: result.render },
    'timekeepingLog'
  );

  return (
    <>
      {loading && <Loadingz />}
      <View className="flex-1 w-full items-center px-4">
        <Checking setResult={setResult} setLoading={setLoading} />
        <CheckTimekeepingResult result={result} />
        <View className="mt-4 flex-1 w-full">
          <Text className="uppercase font-bold text-lg mb-2">Lịch sử chấm công {moment().format('DD/MM/YYYY')}</Text>
          {!isLoading && (!data || data.length === 0) ? (
            <Text className="mt-4">Không có lịch sử chấm công.</Text>
          ) : (
            <FlatList
              data={data || []}
              keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
              className="w-full rounded-lg"
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => (
                <View className="bg-white my-2 rounded-lg w-full p-2">
                  <Text className="py-1">Thời gian: {item?.time}</Text>
                  <Text className="py-1">Thiết bị: {item?.deviceName}</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default CheckTimekeeping;
