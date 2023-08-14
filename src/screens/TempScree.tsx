import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNav } from '../navigation/hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { resetProfileInfo } from '../store/profileInfoSlice';

const Temp: React.FC = () => {
  const dispatch = useAppDispatch();
  const profileData = useAppSelector(state => state.profileInfo.profile);
  const guestProfileData = useAppSelector(state => state.guestProfileInfo.profile)
  const navigation = useNav()
  const handeProfileLog = () => {
    if (profileData) {
      console.log(profileData);
    } else {
      console.log('profile data not accessible yet!');
    }
  };
  const handleGuestProfileLog = () => {
    if (guestProfileData) {
      console.log(guestProfileData);
    } else {
      console.log('guest profile data not accessible yet!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This page is under construction!!</Text>
      <Image
        source={require('../assets/under_construction.jpg')}
        style={styles.image}
      />
      <Text style={styles.text}>Please come back in ... Never!</Text>
      <View style={styles.button}>
        <Button
          title="Go Back to Where You Came From !!"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.button}>
        <Button title="log profileinfo" onPress={handeProfileLog} />
      </View>
      <View style={styles.button}>
        <Button title="log guestprofileinfo" onPress={handleGuestProfileLog} />
      </View>
      <View style={styles.button}>
        <Button
          title="clear profileinfo"
          onPress={() => dispatch(resetProfileInfo())}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 100,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    alignSelf: 'center',
  },
  container: {
    padding: 30,
    backgroundColor: '#000',
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
});

export default Temp;
