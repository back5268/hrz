import { checkTimekeepingApi } from '@/api/timekeeping';
import { Hrz } from '@/components/core';
import { CameraView, useCameraPermissions } from 'expo-camera';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Device from 'expo-device';

const NUMBER_OF_CIRCLES = 120; // Số lượng que quay xung quanh camera
const BAR_WIDTH = 4; // Độ rộng của hình que
const BAR_HEIGHT = 20; // Chiều dài của hình que

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);
  const [countdown, setCountdown] = useState(3);

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

      spinAnimation.start();
      const timer = setTimeout(() => {
        spinAnimation.stop();
        setIsSpinning(false);
        takePicture();
      }, 3000);

      const interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearTimeout(timer);
        spinAnimation.stop();
        clearInterval(interval);
      };
    }
  }, [isSpinning]);

  const rotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const file = await cameraRef.current.takePictureAsync({
        base64: false,
        quality: 0.8, 
      });
      const reponse = await checkTimekeepingApi({
        formData: { file: { uri: file.uri, type: 'image/jpeg', name: 'photo.jpg' } },
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm'),
        deviceName: Device.deviceName
      });
      if (reponse) {
        console.log(reponse);
      } else console.log(1);
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
      <Hrz />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    overflow: 'hidden',
    width: 300,
    height: 300,
    position: 'relative'
  },
  camera: {
    width: '100%',
    height: '100%'
  },
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
