import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Iconz } from '.';

export const Inputz = ({ icon, label, type, value, placeholder, handleChangeText, className = '', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={className}>
      <Text className="text-base text-color font-pmedium">{label}</Text>
      <View className="w-full h-12 px-4 border rounded-md border-border/30 focus:border-primary focus:border-2 flex flex-row items-center">
        {!!icon && (
          <View className="mr-4">
            <Iconz name={icon} color="gray" />
          </View>
        )}
        <TextInput
          className="flex-1 text-color text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={type === 'password' && !showPassword}
          {...props}
        />
        {type === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Iconz name={showPassword ? 'eye-off' : 'eye'} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
