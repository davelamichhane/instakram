import { nanoid } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { listSomeUsers } from '../../customGraphql/queries';
import { useNav } from '../../navigation/hooks';
import { setActiveTab } from '../../store/generalSlice';
import { fetchGuestData } from '../../store/guestProfileInfoSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [userObjects, setUserObjects] = useState<
    { username: string; name: string; profilePicKey: string }[]
  >([]);
  const dispatch = useAppDispatch();
  const navigation = useNav()
  const loggedInUser = useAppSelector(
    state => state.profileInfo.profile.getUser.username,
  );

  // when a username is searched for (submitted)
  const handleSearch = async () => {
    console.log(`
Executing: handleSearch/Search.tsx
1. Grab Data using custom query
2. setUsername with data
`);
    try {
      const response = await API.graphql({
        query: listSomeUsers,
        variables: {
          username: null,
          filter: { username: { contains: searchText.toLowerCase() } },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const objects = (response as { data: { listUsers: { items: any[] } } }).data
        .listUsers.items;
      console.log('Complete #1');

      setUserObjects(objects);
      console.log('Complete #2');

      console.log('Finished Executing: handleSearch/Search.tsx');
    } catch (err) {
      console.log('Error Origin: handleSearch/Search.tsx', err);
    }
  };

  // when a search result is clicked
  const handleClick = (guest: string) => {
    console.log(`
Executing: handleClick/Search.tsx
1. If user clicks on his/her own username naviagate to profile. Else perform 2 & 3 
2. fetch guest data 
3. navigate to guest profile screen
`);
    try {
      if (guest === loggedInUser) {
        dispatch(setActiveTab('profile'))
        console.log('Completed #1');
      } else {
        dispatch(fetchGuestData({ username: guest }));
        console.log('Completed #2');

        navigation.navigate('GuestProfile');
        console.log('Completed #3');
      }

      console.log('Finished Executing: handleClick/Search.tsx');
    } catch (err) {
      console.log('Error Origin: handleClick/Search.tsx', err);
    }
  };

  const IdkWhatToCallIt: React.FC<{
    name: string;
    username: string;
    profilePicKey: string;
  }> = ({ name, username, profilePicKey }) => {
    return (
      <View style={styles.innerContainer}>
        <Image
          source={
            !profilePicKey
              ? require('../../assets/profile_icon.jpg')
              : { uri: profilePicKey }
          }
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{username}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        placeholder="Search"
        placeholderTextColor="#000"
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoCapitalize="none"
      />
      <View>
        {userObjects.map(userObject => {
          const { name, username, profilePicKey } = userObject;
          return (
            <TouchableOpacity
              key={nanoid()}
              onPress={() => handleClick(username)}>
              <IdkWhatToCallIt
                name={name}
                username={username}
                profilePicKey={profilePicKey}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  input: {
    backgroundColor: '#aaa',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#fefefe',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingLeft: 10,
    alignItems: 'center',
  },
  textContainer: { marginLeft: 5 },
  image: { height: 40, width: 40, borderRadius: 20, marginHorizontal: 10 },
  text: { color: 'white' },
});

export default Search;
