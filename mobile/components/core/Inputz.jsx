import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useController } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

export const Inputz = ({ icon, label, type, value, handleChangeText, className = '', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={className}>
      <Text className="text-base text-color font-pmedium">{label}</Text>
      <View className="w-full h-12 px-4 border rounded-md border-border/30 focus:border-primary focus:border-2 flex flex-row items-center">
        {!!icon && (
          <View className="mr-4">
            <Feather name={icon} color="gray" size={20} />
          </View>
        )}
        <TextInput
          className="flex-1 text-color text-base"
          value={value}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={type === 'password' && !showPassword}
          {...props}
        />
        {type === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye-off' : 'eye'} color="gray" size={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const InputForm = ({ label, name, disabled, control, errors = {}, left, right, className = '', ...props }) => {
  const {
    field: { onChange, onBlur, value }
  } = useController({
    control,
    defaultValue: '',
    name
  });

  return (
    <View className="flex flex-col w-full p-2">
      <TextInput
        label={label}
        value={value}
        placeholderTextColor="#7B7B8B"
        onChangeText={onChange}
        onBlur={onBlur}
        editable={!disabled}
        left={left ? <TextInput.Icon name={left} /> : null}
        right={right ? <TextInput.Icon name={right} /> : null}
        error={!!errors[name]}
        {...props}
      />
      {errors[name] && <Text className="text-red-400 text-xs ml-2 mt-1">{errors[name]?.message}</Text>}
    </View>
  );
};
