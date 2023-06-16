import {API, Auth} from 'aws-amplify';
import {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AccountType, setIsLoggedIn} from '../store/generalSlice';
import {RootState} from '../store/configureStore';
import {createUser} from '../graphql/mutations';

const EmailVerification = () => {
  const {password, username} = useSelector<RootState, AccountType>(
    state => state.general.account,
  );
  const [verificationText, setVerificationText] = useState('');
  const dispatch = useDispatch();

  const handleChange = (text: string) => {
    setVerificationText(text);
  };

  const handleSubmit = async (
    verificationCode: string,
    username: string,
    password: string,
  ) => {
    try {
      // verify email
      await Auth.confirmSignUp(username, verificationCode);
      //sign in
      await Auth.signIn(username, password);
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
      // set loggied in true
      dispatch(setIsLoggedIn(true));
    } catch (error: any) {
      console.log('error verifying email ', error);
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
