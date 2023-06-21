import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {nanoid} from '@reduxjs/toolkit';
import {API} from 'aws-amplify';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {setActiveTab} from '../../store/generalSlice';
import {fetchGuestData} from '../../store/guestProfileInfoSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [userObjects, setUserObjects] = useState<
    {username: string; name: string; profilePicKey: string}[]
  >([]);
  const [selectedGuest, setSelectedGuest] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // when a username is searched for (submitted)
  const handleSearch = async () => {
    console.log(
      '1. Define query 2. Use query 3. Grab Data 4. setUsername with data',
    );
    try {
      const query = /* GraphQL */ `
        query ListUsers($username: String, $filter: ModelUserFilterInput) {
          listUsers(username: $username, filter: $filter) {
            items {
              username
              name
              profilePicKey
            }
          }
        }
      `;
      console.log('Complete #1');

      const response = await API.graphql({
        query,
        variables: {
          username: null,
          filter: {username: {contains: searchText.toLowerCase()}},
        },
      });
      console.log('Complete #2');

      const objects = (response as {data: {listUsers: {items: any[]}}}).data
        .listUsers.items;
      console.log('Complete #3');

      setUserObjects(objects);
      console.log('Complete #4');
    } catch (err) {
      console.log('Error Origin: handleSearch/Search/search/components', err);
    }
  };

  // when a search result is clicked
  const handleClick = (guest: string) => {
    console.log('1. fetch guest data 2. navigate to guest profile screen');
    try {
      dispatch(fetchGuestData(guest));
      console.log('Completed #1');

      navigation.navigate('GuestProfile')
      console.log('Completed #2');
    } catch (err) {
      console.log('Error Origin: handleClick/Search/search/components', err);
    }
  };

  const IdkWhatToCallIt: React.FC<{
    name: string;
    username: string;
    profilePicKey: string;
  }> = ({name, username, profilePicKey}) => {
    return (
      <View style={styles.innerContainer}>
        <Image
          source={
            !profilePicKey
              ? require('../../assets/profile_icon.jpg')
              : {uri: profilePicKey}
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
          const {name, username, profilePicKey} = userObject;
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
  textContainer: {marginLeft: 5},
  image: {height: 40, width: 40, borderRadius: 20, marginHorizontal: 10},
  text: {color: 'white'},
});

export default Search;
