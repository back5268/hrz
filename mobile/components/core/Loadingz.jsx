import { themeColor } from '@/theme';
import { View, ActivityIndicator, Dimensions, Platform } from 'react-native';

export const Loadingz = ({ root }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get('screen').height;

  return (
    <View
      className="absolute flex justify-center items-center w-full h-full z-10"
      style={{
        height: root ? screenHeight : '100%',
        backgroundColor: themeColor.surfaceVariant,
        opacity: root ? 1 : 0.7
      }}
    >
      <ActivityIndicator animating={true} color={themeColor.primary} size={osName === 'ios' ? 'large' : 50} />
    </View>
  );
};
