import { getListShiftInfoApi, getListSyntheticTimekeepingApi } from '@/api';
import { Buttonz, Hrz, Loadingz, Selectz } from '@/components/core';
import { formatDate, getMonths, getYears } from '@/lib/helper';
import { useGetApi } from '@/lib/react-query';
import { themeColor } from '@/theme';
import { router } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { Card, DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Calendar = ({ days = [] }) => {
  const [selectedDate, setSelectedDate] = useState({});
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const handleDayPress = (day) => setSelectedDate(day);

  useEffect(() => {
    const date = days?.find((d) => formatDate(d.date, 'date') === moment().format('DD/MM/YYYY'));
    if (date) setSelectedDate(date);
  }, [days]);

  const renderItem = ({ item }) => {
    if (!item) return null;
    const isFuture = new Date(item.date) > new Date();
    const isSelected = selectedDate?.date === item.date;
    const isOt = item.type === 2
    const status = !item.summary ? 0 : item.summary === item.totalWork ? 1 : item.summary < item.totalWork ? 2 : -1;

    return (
      <TouchableOpacity
        className="flex items-center justify-center w-10 h-10 m-1 rounded-md"
        style={{
          opacity: !item.value ? 0 : 100,
          backgroundColor: isSelected
            ? themeColor.primary
            : !item.totalWork
              ? 'rgb(186.63, 199.1, 205.12)'
              : isOt ? "rgb(193.62, 121.08, 206.02)" : isFuture
                ? themeColor.surfaceVariant
                : status === 0
                  ? 'rgb(248.18, 138.44, 130.38)'
                  : status === 1
                    ? 'rgb(96.9, 189.9, 181.22)'
                    : 'rgb(255, 191.14, 96.9)'
        }}
        onPress={() => item && handleDayPress(item)}
      >
        <Text className="text-white">{item.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Card className="mt-6 py-4 mx-2 justify-center items-center mb-8">
      <View className="h-80">
        <View className="flex flex-row">
          {dayNames.map((dayName, index) => (
            <Text key={index} className="text-center w-10 h-10 m-1 leading-12 text-gray-500">
              {dayName}
            </Text>
          ))}
        </View>
        <FlatList data={days} numColumns={7} keyExtractor={(_, index) => index.toString()} renderItem={renderItem} />
      </View>

      <View className="px-2">
        <Text className="uppercase font-semibold mb-2">Ngày {formatDate(selectedDate?.date, 'date')}</Text>
        <Hrz />
        <View className="mt-4">
          <DataTable>
            {[
              { name: 'Thời gian bắt đầu vào làm', value: selectedDate?.timeStart },
              { name: 'Thời gian kết thúc', value: selectedDate?.timeEnd },
              { name: 'Thời gian bắt đầu OT', value: selectedDate?.timeStartOt },
              { name: 'Thời gian kết thúc OT', value: selectedDate?.timeEndOt },
              { name: 'Tổng thời gian', value: selectedDate?.totalTime },
              { name: 'Check in', value: selectedDate?.checkInTime || '-' },
              { name: 'Check out', value: selectedDate?.checkOutTime || '-' },
              { name: 'Đi muộn', value: selectedDate?.late || '-' },
              { name: 'Về sớm', value: selectedDate?.soon || '-' },
              { name: 'Tổng công tính', value: selectedDate?.summary }
            ].map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Title style={{ flex: 2 }}>
                  <Text className="text-sm font-semibold">{item.name}</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>
                  <Text className="text-base font-semibold">{item.value}</Text>
                </DataTable.Title>
              </DataTable.Row>
            ))}
          </DataTable>
          <Text className="uppercase font-semibold my-2">Đơn từ</Text>
          <Hrz />
          {selectedDate?.applications?.map((app, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => router.push(`/application/${app}`)}>
                <Text className="leading-10 px-4" style={{ color: themeColor.primary }}>
                  {app}
                </Text>
              </TouchableOpacity>
            );
          })}
          <Buttonz label="Tạo đơn" onPress={() => router.push('/application/create')} className="mt-4" />
        </View>
      </View>
    </Card>
  );
};

const handleParams = (params) => {
  if (params.month && params.year) {
    const month = params.month,
      year = params.year;
    params.fromDate = moment(`${year}-${month}`, 'YYYY-M').startOf('month').format('YYYY-MM-DD');
    params.toDate = moment(`${year}-${month}`, 'YYYY-M').endOf('month').format('YYYY-MM-DD');
  }
  return { ...params, month: undefined, year: undefined };
};

const today = new Date();
const INITPARAMS = {
  month: today.getMonth() + 1,
  year: today.getFullYear()
};

const Timekeeping = () => {
  const [render, setRender] = useState(false);
  const [params, setParams] = useState(INITPARAMS);
  const [days, setDays] = useState([]);;
  const { data: shifts } = useGetApi(getListShiftInfoApi, {}, 'shifts');
  const { data } = useGetApi(getListSyntheticTimekeepingApi, handleParams({ shift: shifts?.[0]?._id, ...params, render }), 'syntheticTimekeeping');

  useEffect(() => {
    const timekeeping = data?.[0]?.data || [];
    const year = Number(params.year);
    const month = Number(params.month);
    const firstDate = new Date(year, month - 1, 1);
    const lastDate = new Date(year, month, 0);
    const firstDay = firstDate.getDay();
    const lastDay = lastDate.getDay();
    const newDays = [];
    for (let i = 0; i < firstDay + lastDate.getDate() + (7 - lastDay) - 1; i++) {
      if (i < firstDay) newDays.push({});
      else if (i < firstDay + lastDate.getDate()) {
        const date = moment([year, month - 1, i - firstDay + 1]).format("YYYY-MM-DD");
        newDays.push({ value: i - firstDay + 1, date });
      }
      else newDays.push({});
    }

    if (timekeeping?.length > 0) {
      timekeeping.forEach((datum) => {
        const value = moment(datum.date).format('DD');
        const key = newDays.findIndex((n) => Number(n.value) === Number(value));
        if (key >= 0) newDays[key] = { ...newDays[key], ...datum };
      });
    }
    setDays(newDays);
  }, [data]);

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        className="flex-1 px-2"
        showsVerticalScrollIndicator={true}
        onEndReached={() => console.log('Load more data')}
        onRefresh={() => setRender((pre) => !pre)}
        refreshing={false}
        ListHeaderComponent={
          <>
            <View className="flex-row items-center justify-between rounded-lg">
              {[
                { name: 'Công chính thức', value: `${data?.[0]?.reality || 0} / ${data?.[0]?.total || 0}` },
                { name: 'Công OT', value: `${data?.[0]?.realityOt || 0} / ${data?.[0]?.totalOt || 0}` },
              ].map((item, index) => (
                <Card key={index} className="flex-1 py-4 rounded-md mx-2">
                  <Text className="text-md font-bold mb-1 text-center mx-2 pb-2" style={{ color: themeColor.primary }}>
                    {item.name}
                  </Text>
                  <View className="px-2">
                    <Hrz />
                  </View>
                  <Text className="leading-6 text-center text-xl font-bold pt-2" style={{ color: themeColor.primary }}>
                    {item.value}
                  </Text>
                </Card>
              ))}
            </View>

            <View className="w-full mt-4">
              <Selectz label="Ca làm việc" value={params.shift || shifts?.[0]?._id} options={shifts} setValue={(e) => setParams({ ...params, shift: e })} />
            </View>
            <View className="flex flex-row">
              <View className="w-6/12">
                <Selectz label="Năm" value={params.year} options={getYears()} setValue={(e) => setParams({ ...params, year: e })} />
              </View>
              <View className="w-6/12">
                <Selectz label="Tháng" value={params.month} options={getMonths()} setValue={(e) => setParams({ ...params, month: e })} />
              </View>
            </View>
          </>
        }
        data={[{ days }]}
        renderItem={({ item }) => <Calendar days={item.days} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Timekeeping;
