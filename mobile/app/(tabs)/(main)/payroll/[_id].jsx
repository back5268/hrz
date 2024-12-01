import { handleSalaryApi, previewPayrollApi } from '@/api';
import { Buttonz, InputForm, Modalz } from '@/components/core';
import { useGetApi } from '@/lib/react-query';
import { SalaryValidation } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, ScrollView, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const showToast = (title, type = 'error') => {
  Toast.show({
    type: type,
    text2: title
  });
};

const DetailPayroll = () => {
  const { _id } = useLocalSearchParams();
  const contentWidth = Dimensions.get('window').width;
  const { data } = useGetApi(previewPayrollApi, { _id }, 'payrollz');
  const [visible, setVisible] = useState(false);

  const onConfirm = async () => {
    const response = await handleSalaryApi({ _id, status: 1 });
    if (response) {
      showToast('Xác nhận thành công!', 'success');
      router.back();
    }
  };

  const onSubmit = async (value) => {
    const response = await handleSalaryApi({ _id, status: 2, reason: value.reason });
    if (response) {
      showToast('Yêu cầu tính lại lương thành công!', 'success');
      router.back();
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SalaryValidation)
  });

  return (
    <SafeAreaView className="flex-1">
      <Modalz visible={visible} setVisible={setVisible}>
        <View className="h-32">
          <InputForm
            className="h-24"
            label="Lý do yêu cầu tính lại lương (*)"
            name="reason"
            control={control}
            errors={errors}
            multiline
            numberOfLines={4}
          />
        </View>
        <View className="w-full px-1">
          <Buttonz label="Xác nhận" onPress={handleSubmit(onSubmit)} />
        </View>
      </Modalz>
      <ScrollView className="flex-1 p-4">
        <RenderHTML contentWidth={contentWidth} source={{ html: data?.content }} />
      </ScrollView>
      {data?.status === 1 && (
        <View className="flex flex-row flex-wrap w-full my-2">
          <View className="w-6/12 px-1">
            <Buttonz label="Yêu cầu tính lại" mode="outlined" onPress={() => setVisible(true)} />
          </View>
          <View className="w-6/12 px-1">
            <Buttonz label="Xác nhận" onPress={onConfirm} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DetailPayroll;
