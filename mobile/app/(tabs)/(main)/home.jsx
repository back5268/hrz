import { useUserState } from '@/store';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Iconz } from '@/components/core';
import { useRouter } from 'expo-router';
import { Card } from 'react-native-paper';
import { themeColor } from '../../../theme';
import { getListNotifyApi, viewAllNotifyApi } from '@/api';
import { useGetApi } from '@/lib/react-query';

const Home = () => {
  const { userInfo } = useUserState();
  const router = useRouter();
  const { data } = useGetApi(getListNotifyApi, {}, 'notifyz');
  const numberView = data?.filter((d) => d.status === 0)?.length;
  console.log(numberView,1);
  

  const items = [
    { label: 'Nhân viên', icon: 'account-multiple', route: '/employee' },
    { label: 'Hợp đồng', icon: 'file', route: '/contract' },
    { label: 'Tin tức', icon: 'book-open', route: '/new' },
    { label: 'Bảng công', icon: 'briefcase-clock', route: '/timekeeping' },
    { label: 'Bảng lương', icon: 'credit-card', route: '/payroll' },
    { label: 'Đơn từ', icon: 'archive', route: '/application' }
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: themeColor.surfaceVariant }}>
      <View className="px-6">
        <View className="w-full flex flex-row justify-between items-center my-2">
          <Image source={images.logo} className="w-28 h-28" resizeMode="contain" />
          <TouchableOpacity
            onPress={async () => {
              if (numberView > 0) await viewAllNotifyApi();
              router.push('/notify');
            }}
            className="relative"
          >
            <Iconz name="bell" size={30} color={themeColor.secondary} />
            {numberView > 0 && <View className="absolute h-2 w-2 bg-red-500 rounded-full right-1 top-1"></View>}
          </TouchableOpacity>
        </View>
        <View>
          <Text className="font-pmedium text-sm" style={{ color: themeColor.secondary }}>
            Xin chào,
          </Text>
          <Text className="text-2xl font-semibold" style={{ color: themeColor.secondary }}>
            {userInfo?.fullName}
          </Text>
        </View>
      </View>

      <View className="rounded-t-[30] h-full bg-white px-4 mt-6">
        <Card className="mx-2 mt-8">
          <Card.Content>
            <TouchableOpacity onPress={() => router.push('check-timekeeping')}>
              <View className="items-center">
                <Iconz name="emoticon" size={32} />
                <Text className="text-sm text-gray-700 mt-2">Chấm công</Text>
              </View>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <View className="flex flex-wrap flex-row justify-between mt-6">
          {items.map((item, index) => (
            <View key={index} className="w-1/3 p-2">
              <Card onPress={() => router.push(item.route)} className="h-24 w-full">
                <Card.Content className="items-center justify-center">
                  <Iconz name={item.icon} size={26} />
                  <Text className="text-sm text-gray-700 mt-2 text-center">{item.label}</Text>
                </Card.Content>
              </Card>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
