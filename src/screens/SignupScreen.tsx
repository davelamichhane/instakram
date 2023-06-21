import {View, Image, StyleSheet} from 'react-native'
import SignupForm from '../components/signup/SignupForm';

const SignupScreen = () => {
  return(
  <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/instagram_logo.png')} style={styles.logo} />
      </View>
      <SignupForm />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom:20
  },
  logo: {
    height: 80,
    width: 80,
  },
});


export default SignupScreen
