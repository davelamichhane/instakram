import {API, graphqlOperation} from 'aws-amplify';
import {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {listAllUsernames} from '../../customGraphql/queries';
import {listUsers} from '../../graphql/queries';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const handleSearch = async () => {
    try {
      const response = await API.graphql({
        query: listUsers,
        variables: {},
        //authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const users = (response as {data: {listUsers: {items: any[]}}}).data
        .listUsers.items;
      console.log(users.map(user => user.username));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDick = async () => {
    try {
      const query = /* GraphQL */ `
        query ListUsers($username: String) {
          listUsers(username: $username) {
            items {
              username
            }
          }
        }
      `;
      const response = await API.graphql({
        query,
        variables: {},
      });
      const usernames = (response as {data: {listUsers: {items: string[]}}})
        .data.listUsers.items;
      console.log(usernames);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        placeholder="Search"
        placeholderTextColor="#000"
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleDick}
        returnKeyType="search"
      />
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
  },
});

export default Search;
