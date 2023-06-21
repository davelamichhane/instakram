import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Auth} from 'aws-amplify';
import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {setIsLoggedIn, setIsWaiting} from '../../store/generalSlice';
import { useAppDispatch } from '../../store/hooks';
import { fetchData } from '../../store/profileInfoSlice';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onLogin = async (username: string, password: string) => {
    try {
      // sign in
      dispatch(setIsWaiting(true));
      await Auth.signIn(username, password);
      dispatch(setIsWaiting(false));

      // save user info for easy access
       dispatch(fetchData({username}))

      // let the store know you're logged in
      dispatch(setIsLoggedIn(true));
    } catch (error: any) {
      // dont use any here
      Alert.alert('Incorrect Username or Password', error.message, [
        {text: 'OK', style: 'cancel'},
        {
          text: 'Sign Up!',
          onPress: () => navigation.navigate('Signup'),
        },
      ]);
    }
  };
  return (
    <View>
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

      {/* forgot password */}
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* submit password */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => onLogin(username, password)}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* sign up */}
      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
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

export default LoginForm;
