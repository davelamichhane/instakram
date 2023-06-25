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

const EmailVerification: React.FC = () => {
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
    console.log(`
Executing: handleSubmit/EmailVerificationScreen.tsx
1. Verify email
2. Sign in 
3. Create user in database
4. Save username to redux
5. Set isLoggedIn to true
`);
    try {
      await Auth.confirmSignUp(username, verificationCode);
      console.log('Completed #1');

      await Auth.signIn(username, password);
      console.log('Completed #2');

      await API.graphql({
        query: createUser,
        variables: {
          input: {
            username,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      console.log('Completed #3');

      dispatch(fetchData({username}));
      console.log('Completed #4');

      dispatch(setIsLoggedIn(true));
      console.log('Completed #5');

      console.log(
        'Finished Executing: handleSubmit/EmailVerificationScreen.tsx',
      );
    } catch (err) {
      console.log(
        'Error Origin: handleSubmit/EmailVerificationScreen.tsx\n',
        err,
      );
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
