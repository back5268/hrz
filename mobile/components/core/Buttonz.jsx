import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

export const Buttonz = ({ children, label, handlePress, containerClassName = '', labelClassName = '', isLoading }) => {
  return (
    <View className="my-4">
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-[#673AB7] rounded-md min-h-[48px] px-2 flex flex-row justify-center items-center ${containerClassName} ${
          isLoading ? 'opacity-50' : ''
        }`}
        disabled={isLoading}
      >
        {children ? children : <Text className={`text-white font-psemibold text-nomal uppercase ${labelClassName}`}>{label}</Text>}

        {isLoading && <ActivityIndicator animating={isLoading} color="#fff" size="small" className="ml-2" />}
      </TouchableOpacity>
    </View>
  );
};
