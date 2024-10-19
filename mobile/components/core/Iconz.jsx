import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

export const Iconz = ({ name, size = 24, color = '#673AB7' }) => {
  return <Feather name={name} size={size} color={color} />;
};

export const IconBoldz = ({ name, size = 24, color = '#673AB7' }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};
