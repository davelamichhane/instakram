import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {API, Auth} from 'aws-amplify';
import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {createUser} from '../../graphql/mutations';
import {setAccount} from '../../store/generalSlice';
import { setAuthUsername } from '../../store/profileInfoSlice';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const onSignup = async (
    email: string,
    username: string,
    password: string,
  ) => {
    try {
      // signup for user pool
      await Auth.signUp({
        username,
        password,
        attributes: {email},
        autoSignIn: {enabled: true},
      });
      // save info in redux store
      dispatch(setAccount({email, username, password}));
      dispatch(setAuthUsername(username))
      // go to emial verification page
      navigation.navigate('EmailVerification');
    } catch (error: any) {
      // dont use any here!!
      console.log('error signing up: ', error);
    }
  };

  return (
    <View>
      {/* email */}
      <TextInput
        style={styles.input}
        value={email}
        placeholder="email"
        onChangeText={text => setEmail(text)}
      />

      {/* username */}
      <TextInput
        style={styles.input}
        value={username}
        placeholder="username"
        onChangeText={text => setUsername(text)}
      />

      {/* password */}
      <TextInput
        style={[styles.input, passwordBorderColor(password)]}
        value={password}
        placeholder="password"
        onChangeText={text => setPassword(text)}
      />

      {/* submit */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => onSignup(email, username, password)}>
        <Text style={styles.submitButtonText}>submit</Text>
      </TouchableOpacity>

      {/* back to login */}
      <TouchableOpacity
        style={styles.backToLogin}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLoginText}>back to login</Text>
      </TouchableOpacity>
    </View>
  );
};

const passwordBorderColor = (password: string) => {
  if (password && password.length < 8) return {borderColor: 'red'};
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: '#d3d3d3',
    backgroundColor: '#fafafa',
  },
  backToLogin: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  backToLoginText: {
    color: '#6bb0f5',
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
  signupText: {
    color: '#6bb0f5',
  },
  submitButton: {
    backgroundColor: '#33a8ff',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  submitButtonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default SignupForm;
