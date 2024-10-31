import { Application } from '@/components/application';
import { useLocalSearchParams } from 'expo-router';

const DetailApplication = () => {
  const { _id } = useLocalSearchParams();

  return <Application _id={_id} />;
};

export default DetailApplication;
