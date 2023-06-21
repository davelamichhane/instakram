import {API, Auth} from 'aws-amplify';
import {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {setIsLoggedIn} from '../store/generalSlice';
import {createUser} from '../graphql/mutations';
import {fetchData} from '../store/profileInfoSlice';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useAppDispatch} from '../store/hooks';

type RouteParams = {
  username: string;
  password: string;
};

const EmailVerification = () => {
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {username, password} = route.params;
  const [verificationText, setVerificationText] = useState('');
  const dispatch = useAppDispatch();

  const handleChange = (text: string) => {
    setVerificationText(text);
  };

  const handleSubmit = async (
    verificationCode: string,
    username: string,
    password: string,
  ) => {
    console.log(
      '1. verify email 2. sign in 3. create user in DB 4. fetch data from db 5. set isLogged true',
    );
    try {
      // verify email
      await Auth.confirmSignUp(username, verificationCode);
      console.log('Complete #1');

      //sign in
      await Auth.signIn(username, password);
      console.log('Complete #2');

      // create user in database
      await API.graphql({
        query: createUser,
        variables: {
          input: {
            username,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      console.log('Complete #3');

      // save user info for easy access
      dispatch(fetchData({username}));
      console.log('Complete #4');

      // set loggied in true
      dispatch(setIsLoggedIn(true));
      console.log('Complete #5');
    } catch (err: any) {
      console.log('Error Origin: handleSubmit/EmailVerification', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Please Enter Verification Code Sent to Your Email
      </Text>
      <TextInput
        style={styles.input}
        placeholder="enter verification code"
        value={verificationText}
        onChangeText={text => handleChange(text)}
        keyboardType="number-pad"
      />
      <Button
        title="Submit"
        onPress={() => handleSubmit(verificationText, username, password)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 160,
    marginHorizontal: 20,
  },
  text: {
    fontWeight: '500',
  },
  input: {
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#fafafa',
    marginVertical: 30,
    borderWidth: 1,
  },
});

export default EmailVerification;
