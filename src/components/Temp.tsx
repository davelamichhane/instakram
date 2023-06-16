import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from 'aws-amplify';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/configureStore';
import {setIsLoggedIn} from '../store/generalSlice';

const logAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    if (items.length === 0) {
      console.log('Async Storage is Empty!!');
    } else {
      items.forEach(([key], value) => {
        console.log(`${key}: ${value}`);
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Cleared Async Storage');
  } catch (e) {
    console.log(e);
  }
};

const Temp: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector<RootState, string>(
    state => state.profileInfo.username,
  );
  const handleSignout = async () => {
    try {
      await Auth.signOut();
      await AsyncStorage.clear();
      dispatch(setIsLoggedIn(false));
    } catch (e) {
      console.log('error signing out', e);
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
        <Button title="Log Async Storage" onPress={logAsyncStorage} />
      </View>
      <View style={styles.button}>
        <Button title="clear Async Storage" onPress={clearAsyncStorage} />
      </View>
      <View style={styles.button}>
        <Button title="Sign Out" onPress={handleSignout} />
      </View>
      <View style={styles.button}>
        <Button title="log username" onPress={()=>console.log('username: ', username)} />
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
  },
  button: {
    marginTop: 20,
  },
});

export default Temp;
