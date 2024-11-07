import { Buttonz, Iconz, Modalz } from '@/components/core';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export const CheckTimekeepingResult = ({ result = {} }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof result.status === 'number') setVisible(true);
  }, [result.render]);

  return (
    <Modalz visible={visible} setVisible={setVisible}>
      <View className="flex flex-col justify-center items-center mt-4">
        {result.status ? (
          <>
            <Iconz name="check-circle" size={32} />
            <Text className="my-2 text-lg text-primary uppercase font-bold">Chấm công thành công</Text>
            <Text>Thời gian: {moment(result.createdAt).format('DD/MM/YYYY HH:mm:ss')}</Text>
            <Text>Vị trí: {result.address}</Text>
          </>
        ) : (
          <>
            <Iconz name="alert-circle" size={32} />
            <Text className="my-2 text-lg text-primary uppercase font-bold">Chấm công thất bại</Text>
          </>
        )}
        <View className="w-6/12 my-2">
          <Buttonz label="Xác nhận" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modalz>
  );
};
