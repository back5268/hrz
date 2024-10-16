import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View className="flex">
        <Link href="/" style={styles.button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff'
  }
});

export default NotFoundScreen;
