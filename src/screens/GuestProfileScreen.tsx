import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useAppSelector} from '../store/hooks';

const GuestProfile: React.FC = () => {
  const {
    username,
    profilePicKey,
    followers,
    following,
    bio,
    name,
    gender,
    pronouns,
  } = useAppSelector(state => state.guestProfileInfo.profile.getUser);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const arrayLength = (arr: any[] | null): number => {
    if (arr) return arr.length;
    return 0;
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
        {/* Go back */}
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Text style={styles.username}>{'<<<'}</Text>
        </TouchableOpacity>
        <Text style={styles.username}>{username}</Text>
      </View>

      <View style={styles.middle}>
        <Image
          style={styles.image}
          source={
            profilePicKey
              ? {uri: profilePicKey}
              : require('../assets/profile_icon.jpg')
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
        {/* Add Follow feature */}
        <TouchableOpacity style={styles.button} onPress={handleFollow}>
          <Text style={{color: '#fff'}}>Follow</Text>
        </TouchableOpacity>

        {/* Navigate to Temp */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Temp')}>
          <Text style={{color: '#fff'}}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  top: {
    flexDirection: 'row',
    marginHorizontal: 9,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight:20
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
    padding: 8,
    width: '47%',
    alignItems: 'center',
  },
});

export default GuestProfile;
