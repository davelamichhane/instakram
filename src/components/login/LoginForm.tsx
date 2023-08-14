import { Auth } from 'aws-amplify';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNav } from '../../navigation/hooks';
import { setIsLoggedIn, setIsWaiting } from '../../store/generalSlice';
import { useAppDispatch } from '../../store/hooks';
import { fetchData } from '../../store/profileInfoSlice';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch()
  const navigation = useNav()

  const onLogin = async (username: string, password: string) => {
    console.log(`
Executing: onLogin/LoginForm.tsx
1. sign in
2. save user info to store for easy access
3. save loggedIn info to the store
Error Case:
a. display alert box, setIsWaiting(false) when clicked 'Back to Login'

`)
    try {

      dispatch(setIsWaiting(true))
      await Auth.signIn(username, password)
      dispatch(setIsWaiting(false))
      console.log('Completed #1')

      dispatch(fetchData({ username }))
      console.log('Completed #2')

      dispatch(setIsLoggedIn(true))
      console.log('Completed #3')

      console.log('Finished Executing: onLogin/LoginForm.tsx')
    } catch (err: any) {
      console.log('Error Origin: onLogin/LoginForm.tsx\n', err)

      Alert.alert('Incorrect Username or Password', err.message, [
        { text: 'Back to Login', onPress: () => dispatch(setIsWaiting(false)) }
      ])
      console.log('Completed #a')
    }
  }


  return (
    <View>
      {/* username */}
      <TextInput
        style={styles.input}
        value={username}
        placeholder="username"
        autoCapitalize='none'
        onChangeText={text => setUsername(text)}
      />

      {/* password */}
      <TextInput
        style={[styles.input, passwordBorderColor(password)]}
        value={password}
        placeholder="password"
        autoCapitalize='none'
        onChangeText={text => setPassword(text)}
      />

      {/* forgot password */}
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ResetPassword')}
      >
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
  if (password && password.length < 8) return { borderColor: 'red' };
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
