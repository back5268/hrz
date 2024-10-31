import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Menu } from 'react-native-paper';

export const Selectz = (props) => {
  const { label = '', value = '', setValue = () => {}, options = [], optionLabel = 'name', optionValue = '_id', menuClassname = "" } = props;
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const handleSelect = (item) => {
    setValue(item);
    closeMenu();
  };

  return (
    <View className="w-full p-2">
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <TextInput
              label={label}
              value={options?.find((o) => (o[optionValue] || o) === value)?.[optionLabel]}
              editable={false}
              right={<TextInput.Icon onPress={openMenu} icon="menu-down" />}
            />
          </TouchableOpacity>
        }
        className={`mt-24 ml-1 w-5/12 ${menuClassname}`}
      >
        <ScrollView style={{ maxHeight: 200 }}>
          {options.map((item, index) => {
            let key, text;
            if (typeof item === 'object') {
              key = item[optionValue];
              text = item[optionLabel];
            } else key = text = item;
            return <Menu.Item key={index} onPress={() => handleSelect(key)} title={text} />;
          })}
        </ScrollView>
      </Menu>
    </View>
  );
};

export const SelectForm = (props) => {
  const {
    name,
    label = '',
    disabled,
    control,
    handleOnchange = () => {},
    errors = {},
    options = [],
    optionLabel = 'name',
    optionValue = '_id'
  } = props;
  const [visible, setVisible] = useState(false);
  const {
    field: { onChange, onBlur, value }
  } = useController({
    control,
    defaultValue: '',
    name
  });

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const handleSelect = (item) => {
    onChange(item);
    handleOnchange();
    closeMenu();
  };

  return (
    <View className="flex flex-col w-full p-2">
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity disabled={disabled} onPress={openMenu}>
            <TextInput
              error={!!errors[name]}
              onBlur={onBlur}
              label={label}
              value={options?.find((o) => (o[optionValue] || o) === value)?.[optionLabel]}
              editable={false}
              right={<TextInput.Icon disabled={disabled} onPress={openMenu} icon="menu-down" />}
            />
          </TouchableOpacity>
        }
        className="mt-24 ml-1 w-11/12"
      >
        <ScrollView style={{ maxHeight: 200 }}>
          {options.map((item, index) => {
            let key, text;
            if (typeof item === 'object') {
              key = item[optionValue];
              text = item[optionLabel];
            } else key = text = item;
            return <Menu.Item key={index} onPress={() => handleSelect(key)} title={text} />;
          })}
        </ScrollView>
      </Menu>
      {errors[name] && <Text className="text-red-400 text-xs ml-2 mt-1">{errors[name]?.message}</Text>}
    </View>
  );
};
