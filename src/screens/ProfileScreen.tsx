import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/profile/Header';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default ProfileScreen;
