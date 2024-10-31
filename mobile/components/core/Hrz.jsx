import { themeColor } from '@/theme';
import React from 'react';
import { View } from 'react-native';

export const Hrz = ({ className = '' }) => {
  return <View className={`border-t ${className}`} style={{ borderColor: themeColor.primary }} />;
};
