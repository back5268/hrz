import { checkTimekeepingApi } from '@/api';
import { CameraView, useCameraPermissions } from 'expo-camera';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import { getDeviceName, speak } from '@/lib/expo';
import { Buttonz } from '../core';
import * as FileSystem from 'expo-file-system';

const getFileSize = async (uri) => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (info.exists) {
      console.log('File size in bytes:', info.size);
      return info.size;
    } else {
      console.error('File does not exist');
    }
  } catch (error) {
    console.error('Error getting file size:', error.message);
  }
};

const NUMBER_OF_CIRCLES = 120;
const BAR_WIDTH = 4;
const BAR_HEIGHT = 20;
export const Checking = ({ setResult = () => {}, setLoading = () => {} }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [location, setLocation] = useState(null);

  const rotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  useEffect(() => {
    if (isSpinning) {
      animatedValue.setValue(0);
      const spinAnimation = Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true
        })
      );

      const interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      spinAnimation.start();
      const timer = setTimeout(() => {
        spinAnimation.stop();
        setIsSpinning(false);
        onSubmit();
      }, 3000);

      return () => {
        clearTimeout(timer);
        spinAnimation.stop();
        clearInterval(interval);
      };
    } else {
      if (cameraRef.current) {
        cameraRef.current.stopRecording?.();
      }
    }
  }, [isSpinning]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return <Buttonz onPress={requestPermission} label="Cho phép truy cập máy ảnh" />;
  }

  const onSubmit = async () => {
    if (cameraRef.current) {
      setLoading(true);
      const file = await cameraRef.current.takePictureAsync({
        quality: 0.8
      });
      const latitude = location?.coords?.latitude;
      const longitude = location?.coords?.longitude;
      const reponse = await checkTimekeepingApi({
        formData: { file: { uri: file.uri, name: file.name || 'image.jpg', type: file.type || 'image/jpeg' } },
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm'),
        deviceName: getDeviceName(),
        latitude,
        longitude
      });
      setLoading(false);
      let address = '',
        status = false;
      if (reponse && !reponse.mess) {
        // speak('Cảm ơn bạn đã chấm công');
        status = 1;
        address = (
          await Location.reverseGeocodeAsync({
            latitude,
            longitude
          })
        )?.[0];
      } else {
        status = 0;
        // speak('Chấm công thất bại');
      }
      setResult((pre) => ({
        ...reponse,
        status,
        render: !pre.render,
        address: `${address?.street ? address?.street + ', ' : ''}${address?.subregion ? address?.subregion + ', ' : ''}${address?.region ? address?.region + ', ' : ''}`
      }));
    }
  };

  const startRotation = () => {
    setCountdown(3);
    setIsSpinning(true);
  };

  return (
    <View className="flex flex-col w-full items-center">
      <View className="justify-center rounded-full overflow-hidden h-[360] w-[360] mt-6">
        <CameraView className="h-[360] w-[360]" facing="front" ref={cameraRef}>
          <View className="h-full w-full flex items-center justify-center">
            <Text className={`text-white text-6xl font-semibold ${isSpinning ? 'block' : 'hidden'}`}>{countdown}</Text>
          </View>
        </CameraView>
        <Animated.View style={[styles.circleWrapper, { transform: [{ rotate: rotation }] }]}>
          {[...Array(NUMBER_OF_CIRCLES).keys()].map((_, index) => (
            <View
              key={index}
              style={[
                styles.circle,
                {
                  transform: [{ rotateZ: `${(360 / NUMBER_OF_CIRCLES) * index}deg` }, { translateY: -160 }]
                }
              ]}
            />
          ))}
        </Animated.View>
      </View>
      <TouchableOpacity onPress={startRotation} className="p-3 rounded-full mt-3">
        <Icon name="camera" size={48} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  circleWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    position: 'absolute'
  },
  captureButton: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 50
  }
});
