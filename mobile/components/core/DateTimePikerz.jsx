import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDate } from '@/lib/helper';

export const DateTimePickerz = (props) => {
  const { label = '', disabled, value = '', setValue = () => {}, mode = 'date' } = props;
  const [visible, setVisible] = useState(false);

  const showMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const handleConfirm = (date) => {
    setValue(date)
    closeMenu();
  };

  return (
    <View className="w-full p-2">
      <TouchableOpacity disabled={disabled} onPress={showMenu}>
        <TextInput
          label={label}
          value={formatDate(value, mode)}
          editable={false}
          right={<TextInput.Icon disabled={disabled} onPress={showMenu} icon="calendar" />}
        />
      </TouchableOpacity>
      <DateTimePickerModal isVisible={visible} mode={mode === "timez" ? "time" : mode} onConfirm={handleConfirm} onCancel={closeMenu} />
    </View>
  );
};
