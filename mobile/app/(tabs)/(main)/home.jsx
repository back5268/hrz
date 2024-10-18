import { useUserState } from '@/store';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Iconz } from '@/components/core';
import { icons } from '@/constants';
import { useRouter } from 'expo-router';

const Home = () => {
  const { userInfo } = useUserState();
  const router = useRouter();

  const items = [
    { label: 'Nhân viên', uri: icons.profile, route: '/employee' },
    { label: 'Hợp đồng', uri: icons.profile, route: '/contract' },
    { label: 'Tin tức', uri: icons.profile, route: '/new' },
    { label: 'Bảng công', uri: icons.profile, route: '/timekeeping' },
    { label: 'Bảng lương', uri: icons.profile, route: '/payroll' },
    { label: 'Đơn từ', uri: icons.profile, route: '/application' }
  ];

  return (
    <SafeAreaView className="flex-1 px-6">
      <View className="px-2">
        <View className="w-full flex flex-row justify-between items-center">
          <Image source={images.logo} className="w-32 h-32" resizeMode="contain" />
          <TouchableOpacity onPress={() => router.push('/notify')}>
            <Iconz name="bell" className="w-6 h-6 text-black" />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="font-pmedium text-sm">Xin chào,</Text>
          <Text className="text-2xl font-semibold">{userInfo?.fullName}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push('check-timekeeping')}
        className="w-full flex flex-row justify-center bg-white rounded-lg py-2 mt-12"
      >
        <View className="items-center">
          <Image source={icons.profile} className="w-10 h-10" />
          <Text className="text-sm text-gray-700 mt-2">Chấm công</Text>
        </View>
      </TouchableOpacity>
      <View className="px-5 rounded-lg p-6 mt-6 flex-row flex-wrap justify-around bg-white">
        {items.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(item.route)} className="items-center my-4 mx-2">
            <Image source={item.uri} className="w-10 h-10" />
            <Text className="text-sm text-gray-700 mt-2">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Home;
