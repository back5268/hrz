import { useState } from 'react';
import { Link, router, useGlobalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { Buttonz, InputForm, Loadingz } from '@/components/core';
import { confirmPasswordApi } from '@/api';
import { Logo } from '@/components/base';
import { ConfirmPasswordValidation } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { themeColor } from '@/theme';

const ConfirmPassword = () => {
  const { username } = useGlobalSearchParams();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ConfirmPasswordValidation)
  });

  const onSubmit = async (value) => {
    setLoading(true);
    const response = await confirmPasswordApi({ ...value, username });
    setLoading(false);
    if (response) {
      Toast.show({
        type: 'success',
        text2: 'Đổi mật khẩu thành công vui lòng đăng nhập lại!'
      });
      router.push('/sign-in');
    }
  };

  return (
    <>
      {loading && <Loadingz />}
      <SafeAreaView className="flex-1">
        <View className="justify-center h-full px-6">
          <Logo />
          <Text className="text-lg font-semibold text-center my-4" style={{ color: themeColor.primary }}>Xác nhận mật khẩu</Text>
          <Text className="text-center my-2">Mã OTP đã được gửi đến email {username}, có hiệu lực trong vòng 5 phút</Text>
          <InputForm left="account" label="Mã OTP (*)" name="otp" control={control} errors={errors} />
          <InputForm left="lock" type="password" label="Mật khẩu (*)" name="password" control={control} errors={errors} />
          <View className="mt-4">
            <Buttonz label="Xác nhận" onPress={handleSubmit(onSubmit)} />
          </View>
          <Link href="/sign-in" className="text-center font-semibold mt-4" style={{ color: themeColor.primary }}>
            Quay lại đăng nhập
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ConfirmPassword;
