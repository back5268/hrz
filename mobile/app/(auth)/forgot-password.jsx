import { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { Buttonz, InputForm, Loadingz } from '@/components/core';
import { sendOtpForgotPasswordApi } from '@/api';
import { Logo } from '@/components/base';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordValidation } from '@/lib/validation';
import { themeColor } from '@/theme';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ForgotPasswordValidation)
  });

  const onSubmit = async (value) => {
    setLoading(true);
    const response = await sendOtpForgotPasswordApi(value);
    setLoading(false);
    if (response) {
      router.push({
        pathname: '/confirm-password',
        params: {
          username: response
        }
      });
    }
  };

  return (
    <>
      {loading && <Loadingz />}
      <SafeAreaView className="flex-1">
        <View className="justify-center h-full px-6">
          <Logo />
          <Text className="text-lg font-semibold text-center my-4" style={{ color: themeColor.primary }}>Quên mật khẩu</Text>
          <InputForm left="account" label="Tài khoản (*)" name="username" control={control} errors={errors} />
          <View className="mt-4">
            <Buttonz label="Gửi mã OTP" onPress={handleSubmit(onSubmit)} />
          </View>
          <Link href="/sign-in" className="text-center font-semibold mt-4" style={{ color: themeColor.primary }}>
            Quay lại đăng nhập
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ForgotPassword;
