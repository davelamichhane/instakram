import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'
import ResetPasswordForm from '../components/resetPassword/resetPasswordForm'
import { useNav } from '../navigation/hooks'

const ResetPasswordScreen: React.FC = () => {
  const navigation = useNav()
  return (
    <>
      <View style={styles.container}>
        <Image source={require('../assets/headerTabIcons/header-logo.png')} style={styles.logo} />
        <ResetPasswordForm />
        <View style={styles.footer}>
          <Divider  style={styles.divider}/>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Text style={styles.bottomText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
    justifyContent:'space-between',
  },
  logo: {
    tintColor: 'black',
    height: 100,
    width: 160,
    resizeMode: 'contain',
  },
  footer: {
    backgroundColor: '#f0f0f0',
    width:'100%',
    alignItems:'center',
  },
  divider:{
    backgroundColor:'#444',
    height:1,
    width:'100%'
  },
  bottomText:{
    margin:7,
    fontWeight:'bold',
    fontSize:14
  }
})

export default ResetPasswordScreen
