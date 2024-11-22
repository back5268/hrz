import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { Buttonz, InputForm, Loadingz } from '@/components/core';
import { useUserState } from '@/store';
import { Logo } from '@/components/base';
import { removeStorage } from '@/lib/async-storage';
import { useForm } from 'react-hook-form';
import { ChangePasswordValidation } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { themeColor } from '@/theme';
import { changePasswordApi } from '@/api';
import Toast from 'react-native-toast-message';

const ChangePassword = () => {
  const { clearUserInfo } = useUserState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ChangePasswordValidation)
  });

  const onSubmit = async (value) => {
    setLoading(true);
    const response = await changePasswordApi(value);
    setLoading(false);
    if (response) {
      clearUserInfo();
      removeStorage('token');
      Toast.show({ type: 'success', text2: 'Đổi mật khẩu thành công vui lòng đăng nhập lại!' });
      router.replace('/sign-in');
    }
  };

  return (
    <>
      {loading && <Loadingz />}
      <SafeAreaView className="flex-1">
        <View className="justify-center h-full px-6">
          <InputForm left="lock" type="password" label="Mật khẩu (*)" name="password" control={control} errors={errors} />
          <InputForm left="lock" type="password" label="Mật khẩu mới (*)" name="newPassword" control={control} errors={errors} />
          <View className="mt-4">
            <Buttonz label="Xác nhận" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChangePassword;
