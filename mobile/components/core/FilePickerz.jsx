import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Buttonz } from './Buttonz';
import { Iconz } from './Iconz';
import { themeColor } from '@/theme';

export const FilePickerz = (props) => {
  const { label = 'File đính kèm', files = [], setFiles = () => {}, multiple = true } = props;
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple
      });
      const files = res.assets;
      setFiles(files);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <View className="w-full p-2">
      <Buttonz icon={() => <Iconz name="upload" color="white" />} label={label} onPress={pickFile} />
      {files?.length > 0 && (
        <View className="w-full flex flex-col p-1">
          {files.map((file, index) => (
            <View
              key={index}
              className="flex flex-row items-center justify-between border rounded-md p-1 mb-2"
              style={{ borderColor: themeColor.primary }}
            >
              <Iconz name="file" />
              <Text numberOfLines={1} className="flex-1 text-center mx-2" style={{ color: themeColor.primary }}>
                {file.name}
              </Text>
              <TouchableOpacity onPress={() => setFiles((pre) => pre.filter((p, i) => i !== index))}>
                <Iconz name="delete" color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
