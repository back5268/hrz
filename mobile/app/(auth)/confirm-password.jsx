import { useState } from 'react';
import { Link, router, useGlobalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Buttonz, Inputz, Loadingz } from '@/components/core';
import { confirmPasswordApi } from '@/api';
import { Logo } from '@/components/base';
import Toast from 'react-native-toast-message';

const ForgotPassword = () => {
  const { username } = useGlobalSearchParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    otp: '',
    password: ''
  });

  const showToast = (title, type = 'error') => {
    Toast.show({
      type: type,
      text2: title
    });
  };

  const submit = async () => {
    const title =
      !form.otp && !form.password
        ? 'Vui lòng nhập mã OTP, mật khẩu để tiếp tục!'
        : form.otp && !form.password
          ? 'Vui lòng nhập mật khẩu!'
          : !form.otp && form.password
            ? 'Vui lòng nhập mã OTP'
            : form.otp && form.password && form.password.length < 6
              ? 'Mật khẩu dài tối thiểu 6 ký tự!'
              : '';
    if (title) return showToast(title);
    setLoading(true);
    const response = await confirmPasswordApi({ ...form, username });
    setLoading(false);
    if (response) {
      showToast('Đổi mật khẩu thành công vui lòng đăng nhập lại!', 'success');
      router.push('/sign-in');
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
          <Text className="text-lg text-center text-primary my-4">Xác nhận mật khẩu</Text>
          <Text className="text-center my-2">Mã OTP đã được gửi đến email {username}, có hiệu lực trong vòng 5 phút</Text>
          <Inputz icon="pocket" placeholder="Mã OTP (*)" value={form.otp} handleChangeText={(e) => setForm({ ...form, otp: e })} />
          <Inputz
            icon="lock"
            type="password"
            placeholder="Mật khẩu (*)"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
          <View className="mt-8">
            <Buttonz label="Xác nhận" handlePress={submit} />
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
