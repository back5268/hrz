import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View>
      <Text>Home screen</Text>
      <Link href="/schedule">
        Go to Schedule screen
      </Link>
    </View>
  );
};

export default Home;
