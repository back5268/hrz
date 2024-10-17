import { useState } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Buttonz, Inputz } from '@/components/core';
import { signInApi } from '@/api';
import { useUserState } from '@/store';
import { Logo } from '@/components/base';
import Toast from 'react-native-toast-message';
import { asyncStorage } from '@/lib/async-storage';

const SignIn = () => {
  const { isAuthenticate, setLoadingz } = useUserState();
  const [form, setForm] = useState({
    username: '',
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
      !form.username && !form.password
        ? 'Vui lòng nhập tài khoản, mật khẩu để tiếp tục!'
        : form.username && !form.password
          ? 'Vui lòng nhập mật khẩu!'
          : !form.username && form.password
            ? 'Vui lòng nhập tài khoản'
            : form.username && form.password && form.password.length < 6
              ? 'Mật khẩu dài tối thiểu 6 ký tự!'
              : '';
    if (title) return showToast(title);
    const response = await signInApi({ ...form });
    if (response) {
      asyncStorage('token', response);
      setLoadingz();
    }
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
        <View
          className="justify-center h-full px-6"
          style={{
            minHeight: Dimensions.get('window').height - 100
          }}
        >
          <Logo />
          <Text className="text-2xl text-center font-semibold text-color my-4 font-psemibold">Log in to Hrz</Text>
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            keyboardType="email-address"
          />
          <Inputz
            icon="lock"
            type="password"
            placeholder="Mật khẩu (*)"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
          <Buttonz label="Đăng nhập" handlePress={submit} className="my-8" />
          <View className="flex items-center"></View>
          <Link href="/forgot-password" className="text-primary text-center font-semibold">
            Quên mật khẩu
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
