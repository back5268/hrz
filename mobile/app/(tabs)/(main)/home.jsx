import { useUserState } from '@/store';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { IconBoldz, Iconz } from '@/components/core';
import { useRouter } from 'expo-router';

const Home = () => {
  const { userInfo } = useUserState();
  const router = useRouter();

  const items = [
    { label: 'Nhân viên', icon: 'users', route: '/employee' },
    { label: 'Hợp đồng', icon: 'file', route: '/contract' },
    { label: 'Tin tức', icon: 'book-open', route: '/new' },
    { label: 'Bảng công', icon: 'sidebar', route: '/timekeeping' },
    { label: 'Bảng lương', icon: 'credit-card', route: '/payroll' },
    { label: 'Đơn từ', icon: 'archive', route: '/application' }
  ];

  return (
    <SafeAreaView className="flex-1 px-6">
      <View className="px-2">
        <View className="w-full flex flex-row justify-between items-center my-4">
          <Image source={images.logo} className="w-28 h-28" resizeMode="contain" />
          <TouchableOpacity onPress={() => router.push('/notify')}>
            <IconBoldz name="bell" size={28} />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="font-pmedium text-sm">Xin chào,</Text>
          <Text className="text-2xl font-semibold text-primary">{userInfo?.fullName}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push('check-timekeeping')}
        className="w-full flex flex-row justify-center bg-white rounded-lg py-2 mt-12"
      >
        <View className="items-center">
          <Iconz name="user-check" size={32} />
          <Text className="text-sm text-gray-700 mt-2">Chấm công</Text>
        </View>
      </TouchableOpacity>
      <View className="px-5 rounded-lg p-6 mt-6 flex-row flex-wrap justify-around bg-white">
        {items.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(item.route)} className="items-center my-4 mx-2">
            <Iconz name={item.icon} size={32} />
            <Text className="text-sm text-gray-700 mt-2">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Home;
