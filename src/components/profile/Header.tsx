import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Auth} from 'aws-amplify';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {setIsLoggedIn} from '../../store/generalSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {resetProfileInfo} from '../../store/profileInfoSlice';

const Header: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const {
    username,
    profilePicKey,
    followers,
    following,
    bio,
    name,
    gender,
    pronouns,
  } = useAppSelector(state => state.profileInfo.profile.getUser);

  const arrayLength = (arr: any[] | null): number => {
    if (arr) return arr.length;
    return 0;
  };

  const handleSignout = async () => {
    console.log('1. Wipe user data 2. Signout 3. set IsLoggedIn to true');
    try {
      dispatch(resetProfileInfo());
      console.log('Complete #1');

      await Auth.signOut();
      console.log('Complete #2');

      dispatch(setIsLoggedIn(false));
      console.log('Complete #3');
    } catch (err) {
      console.log(
        'Error Origin: handleSignout/Header/profile/components\n',
        err,
      );
    }
  };

  const handleFollow = async () => {
    try {
      console.log('ahah');
    } catch (e) {
      console.log('unable to follow: ', e);
    }
  };

  const NumShow: React.FC<{name: string; number: number}> = ({
    name,
    number,
  }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity onPress={handleSignout}>
          <Text style={styles.signout}>signout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.middle}>
        <Image
          style={styles.image}
          source={
            profilePicKey
              ? {uri: profilePicKey}
              : require('../../assets/profile_icon.jpg')
          }
        />
        <NumShow name="Posts" number={24} />
        <NumShow name="followers" number={arrayLength(followers)} />
        <NumShow name="following" number={arrayLength(following)} />
      </View>

      <View style={styles.biobox}>
        <Text style={styles.username}>
          {name} <Text style={styles.subscript}>{pronouns}</Text>{' '}
        </Text>
        <Text style={styles.bio}>{gender}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 10,
        }}>
        {/* Navigate to Edit Profile */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UpdateProfile')}>
          <Text style={{color: '#fff'}}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Navigate to Temp */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Temp')}>
          <Text style={{color: '#fff'}}>Share Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 9,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signout: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  middle: {
    marginVertical: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 90,
    width: 90,
    resizeMode: 'contain',
    borderRadius: 45,
    marginLeft: 5,
  },
  component: {
    flexDirection: 'column',
  },
  number: {color: '#fff', alignSelf: 'center', fontWeight: 'bold'},
  name: {color: '#fff', alignSelf: 'center', fontWeight: 'bold'},
  biobox: {},
  bio: {color: '#fff'},
  subscript: {fontSize: 10, color: '#ccc', textTransform: 'lowercase'},
  button: {
    backgroundColor: '#808080',
    borderRadius: 5,
    padding: 10,
    width: '47%',
    alignItems: 'center',
  },
});

export default Header;
