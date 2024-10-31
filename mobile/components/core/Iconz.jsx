import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { themeColor } from '../../theme';

export const Iconz = ({ name, size = 24, color = themeColor.primary }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};
