import { useState } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Buttonz, Inputz, Loadingz } from '@/components/core';
import { signInApi } from '@/api';
import { useUserState } from '@/store';
import { Logo } from '@/components/base';
import Toast from 'react-native-toast-message';
import { asyncStorage } from '@/lib/async-storage';

const SignIn = () => {
  const { setLoadingz } = useUserState();
  const [loading, setLoading] = useState(false);
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
    setLoading(true)
    const response = await signInApi(form);
    setLoading(false)
    if (response) {
      asyncStorage('token', response);
      setLoadingz();
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
          <Text className="text-lg text-center text-primary my-4">Vui lòng đăng nhập để tiếp tục</Text>
          <Inputz
            icon="user"
            placeholder="Tài khoản (*)"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />
          <Inputz
            icon="lock"
            type="password"
            placeholder="Mật khẩu (*)"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
          <View className="mt-8">
            <Buttonz label="Đăng nhập" onPress={submit} />
          </View>
          <Link href="/forgot-password" className="text-primary text-center font-semibold">
            Quên mật khẩu
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
