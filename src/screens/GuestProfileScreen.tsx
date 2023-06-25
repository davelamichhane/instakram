import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {API} from 'aws-amplify';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SingleItemFromUser} from '../components/types';
import {updateFollowers, updateFollowing} from '../customGraphql/mutations';
import {
  extractFollowersFromGuest,
  extractFollowing,
} from '../customGraphql/queries';
import {
  fetchGuestData,
  resetGuestProfileInfo,
} from '../store/guestProfileInfoSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fetchData} from '../store/profileInfoSlice';

// Component starts here
const GuestProfile: React.FC = () => {
  // local and redux states
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
  const {username: loggedInUsername, following: followingArray} =
    useAppSelector(state => state.profileInfo.profile.getUser);
  const [doesUserFollowGuest, setDoesUserFollowGuest] = useState(false);

  // other hooks
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();

  // utils
  const arrayLength = (arr: any[] | null): number => {
    if (arr) return arr.length;
    return 0;
  };

  // handle follow and unfollow
  const handleFollowUnfollow = async () => {
    console.log(`
Executing: handleFollowUnfollow/GuestProfileScreen.tsx
1. retrieve following array 
2. push updated array to DB 
3. Update redux
4. retrieve guest followers array 
5. push updated array to DB 
6. Update redux
7. set doesUserFollowGuest to !doesUserFollowGuest
`);
    try {
      const userFollowingArrResponse = await API.graphql({
        query: extractFollowing,
        variables: {
          username: loggedInUsername,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const userFollowingArray = (
        userFollowingArrResponse as SingleItemFromUser<'following', string[]>
      ).data.getUser.following;
      console.log('Completed #1');

      const newUsersFollowingArray = userFollowingArray
        ? doesUserFollowGuest
          ? userFollowingArray.filter(friendName => friendName !== username)
          : [...userFollowingArray, username]
        : [username];

      await API.graphql({
        query: updateFollowing,
        variables: {
          username: loggedInUsername,
          array: newUsersFollowingArray,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      console.log('Completed #2');

      dispatch(fetchData({username: loggedInUsername, thangs: ['following']}));
      console.log('Completed #3');

      const guestFollowersArrResponse = await API.graphql({
        query: extractFollowersFromGuest,
        variables: {
          username,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      const guestFollowersArray = (
        guestFollowersArrResponse as SingleItemFromUser<'followers', string[]>
      ).data.getUser.followers;
      console.log('Completed #4');

      const newGuestFollowersArray = guestFollowersArray
        ? doesUserFollowGuest
          ? guestFollowersArray.filter(
              username => username !== loggedInUsername,
            )
          : [...guestFollowersArray, loggedInUsername]
        : [loggedInUsername];

      await API.graphql({
        query: updateFollowers,
        variables: {
          username,
          array: newGuestFollowersArray,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      console.log('Completed #5');

      dispatch(fetchGuestData({username, thangs: ['followers']}));
      console.log('Completed #6');

      setDoesUserFollowGuest(!doesUserFollowGuest);
      console.log('Completed #7');

      console.log('Finished Executing: handleFollow/GuestProfileScreen.tsx')
    } catch (err) {
      console.log(
        'Error Origin: handleFollow/GuestProfileScreen/screens\n',
        err,
      );
    }
  };

  // what does the 'go back' button at top-left do
  const handleGoBack = () => {
    try {
      dispatch(resetGuestProfileInfo());
      navigation.goBack();
    } catch (err) {
      console.log('Error Origin: handleGoBack/GuestProfileScreen ', err);
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

  // local state is dependent on fetched Data from AWS
  // therefore need to attach a useEffect
  useEffect(() => {
    if (followingArray && followingArray.includes(username)) {
      setDoesUserFollowGuest(true);
    } else {
      setDoesUserFollowGuest(false);
    }
  }, [followingArray, username]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/* Go back */}
        <TouchableOpacity onPress={handleGoBack}>
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
        <TouchableOpacity style={styles.button} onPress={handleFollowUnfollow}>
          <Text style={{color: '#fff'}}>
            {doesUserFollowGuest ? 'unfollow' : 'follow'}
          </Text>
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
    marginRight: 20,
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
