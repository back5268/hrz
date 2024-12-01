import { detailNewApi } from '@/api';
import { useGetApi } from '@/lib/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Dimensions, ScrollView } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailApplication = () => {
  const { _id } = useLocalSearchParams();
  const contentWidth = Dimensions.get('window').width;
  const { data } = useGetApi(detailNewApi, { _id }, 'newz');

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <RenderHTML contentWidth={contentWidth} source={{ html: data?.content }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailApplication;
