import { getListSyntheticTimekeepingApi } from '@/api';
import { Hrz, Loadingz, Selectz } from '@/components/core';
import { getMonths, getYears } from '@/lib/helper';
import { useGetApi } from '@/lib/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';

const Calendar = ({ days = [] }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const handleDayPress = (day) => {
    setSelectedDate(day);
  };

  const renderItem = ({ item }) => {
    const status = !item.summary ? 0 : item.summary === item.totalWork ? 1 : item.summary < item.totalWork ? 2 : -1;

    return (
      <TouchableOpacity
        className={`flex items-center justify-center w-11 h-11 m-1 rounded-md ${status === 0 ? 'bg-red-300' : status === 1 ? 'bg-green-300' : status === 2 ? 'bg-orange-300' : 'bg-gray-300'} 
        ${item.value ? '' : 'opacity-0'} ${!item.totalWork ? "bg-gray-300" : ""}`}
        onPress={() => item && handleDayPress(item)}
      >
        <Text className={`${(status >= 0 && item.totalWork) ? 'text-white' : 'text-black'}`}>{item.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Card className="mt-6">
      <View className="flex flex-row">
        {dayNames.map((dayName, index) => (
          <Text key={index} className="text-center w-11 h-11 m-1 leading-12 text-gray-500">
            {dayName}
          </Text>
        ))}
      </View>
      <FlatList data={days} numColumns={7} keyExtractor={(_, index) => index.toString()} renderItem={renderItem} />
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
  const [params, setParams] = useState(INITPARAMS);
  const [days, setDays] = useState([]);
  const { data, isLoading } = useGetApi(getListSyntheticTimekeepingApi, handleParams(params), 'syntheticTimekeeping');

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
      else if (i < firstDay + lastDate.getDate()) newDays.push({ value: i - firstDay + 1 });
      else newDays.push({});
    }

    if (timekeeping?.length > 0) {
      timekeeping.forEach((datum) => {
        const value = moment(datum.date).format('DD');
        const key = newDays.findIndex((n) => Number(n.value) === Number(value));
        if (key >= 0) {
          (newDays[key]._id = datum._id), (newDays[key].totalWork = datum.totalWork), (newDays[key].summary = datum.summary);
        }
      });
    }
    setDays(newDays);
  }, [JSON.stringify(params), JSON.stringify(data)]);

  if (isLoading) return <Loadingz />;

  return (
    <View className="flex flex-col items-center">
      <View className="flex-row items-center justify-between p-4 my-2 rounded-lg">
        <View className="flex-1 flex flex-col items-center border border-border/20 p-4 h-24 rounded-md mx-1">
          <Text className="text-md font-medium mb-1 text-center" style={{ minHeight: 40 }}>
            Công chính thức
          </Text>
          <Text className="leading-6 text-center">{data?.[0]?.total}</Text>
        </View>
        <View className="flex-1 flex flex-col items-center border border-border/20 p-4 h-24 rounded-md mx-1">
          <Text className="text-md font-medium mb-1 text-center" style={{ minHeight: 40 }}>
            Công OT
          </Text>
          <Text className="leading-6 text-center">{data?.[0]?.totalOt}</Text>
        </View>
        <View className="flex-1 flex flex-col items-center border border-border/20 p-4 h-24 rounded-md mx-1">
          <Text className="text-md font-medium mb-1 text-center" style={{ minHeight: 40 }}>
            Công Thực tế
          </Text>
          <Text className="leading-6 text-center">{data?.[0]?.reality}</Text>
        </View>
      </View>

      <View className="flex flex-row mt-8">
        <Selectz label="Tháng" value={params.month} options={getMonths()} setValue={(e) => setParams({ ...params, month: e })} />
        <Selectz label="Năm" value={params.year} options={getYears()} setValue={(e) => setParams({ ...params, year: e })} />
      </View>
      <Calendar days={days} />
    </View>
  );
};

export default Timekeeping;
