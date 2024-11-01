import { useState } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { Buttonz, InputForm, Loadingz } from '@/components/core';
import { useUserState } from '@/store';
import { Logo } from '@/components/base';
import { asyncStorage } from '@/lib/async-storage';
import { useForm } from 'react-hook-form';
import { SigninValidation } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { themeColor } from '@/theme';
import { signInApi } from '@/api';

const SignIn = () => {
  const { setLoadingz } = useUserState();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SigninValidation)
  });

  const onSubmit = async (value) => {
    setLoading(true);
    const response = await signInApi(value);
    setLoading(false);
    if (response) {
      asyncStorage('token', response);
      setLoadingz();
    }
  };

  return (
    <>
      {loading && <Loadingz />}
      <SafeAreaView className="flex-1">
        <View className="justify-center h-full px-6">
          <Logo />
          <Text className="text-lg font-semibold text-center my-4" style={{ color: themeColor.primary }}>Vui lòng đăng nhập để tiếp tục</Text>
          <InputForm left="account" label="Tài khoản (*)" name="username" control={control} errors={errors} />
          <InputForm left="lock" type="password" label="Mật khẩu (*)" name="password" control={control} errors={errors} />
          <View className="mt-4">
            <Buttonz label="Đăng nhập" onPress={handleSubmit(onSubmit)} />
          </View>
          <Link href="/forgot-password" className="text-center font-semibold mt-4" style={{ color: themeColor.primary }}>
            Quên mật khẩu
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignIn;
