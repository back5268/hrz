import { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Buttonz, Inputz, Loadingz } from '@/components/core';
import { sendOtpForgotPasswordApi } from '@/api';
import { Logo } from '@/components/base';
import Toast from 'react-native-toast-message';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: ''
  });

  const showToast = (title, type = 'error') => {
    Toast.show({
      type: type,
      text2: title
    });
  };

  const submit = async () => {
    const title = !form.username ? 'Vui lòng nhập tài khoản để tiếp tục!' : '';
    if (title) return showToast(title);
    setLoading(true);
    const response = await sendOtpForgotPasswordApi(form);
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
    <SafeAreaView className="bg-background h-full">
      {loading && <Loadingz />}
      <ScrollView>
        <View
          className="justify-center h-full px-6"
          style={{
            minHeight: Dimensions.get('window').height - 100
          }}
        >
          <Logo />
          <Text className="text-lg text-center text-primary my-4">Quên mật khẩu</Text>
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />
          <View className="mt-8">
            <Buttonz label="Gửi mã OTP" handlePress={submit} />
          </View>
          <Link href="/sign-in" className="text-primary text-center font-semibold">
            Quay lại đăng nhập
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
