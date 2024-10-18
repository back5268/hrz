import React from 'react';
import { View, Modal, Pressable } from 'react-native';

export const Modalz = ({ visible, setVisible = () => {}, children }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <Pressable className="absolute inset-x-0 inset-y-0 bg-black opacity-40" onPress={() => setVisible(false)} />
      <View className="flex-1 items-center justify-center">
        <View className="w-80 p-2 bg-white rounded-md">
          {children}
        </View>
      </View>
    </Modal>
  );
};
