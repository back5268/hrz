import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export const Buttonz = (props) => {
  const { children, label = 'Xác nhận', mode = 'contained', onPress = () => {}, className = "", ...prop } = props;

  return (
    <View className="w-full p-1">
      <Button mode={mode} onPress={onPress} className={`rounded-md ${className}`} contentStyle={{ height: 48 }} {...prop}>
        {children ? children : <Text className="font-semibold text-nomal uppercase">{label}</Text>}
      </Button>
    </View>
  );
};
