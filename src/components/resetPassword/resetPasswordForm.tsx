import { Auth } from 'aws-amplify'
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useNav } from '../../navigation/hooks'

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

const ResetPasswordForm: React.FC = () => {
  const [isCodeEntered, setIsCodeEntered] = useState(false)
  const [username, setUsername] = useState('')
  const [isUsernameIncorrect, setIsUsernameIncorrect] = useState(false)
  const [isPasswordChanged, setIsPasswordChanged] = useState(false)

  if (isPasswordChanged) {
    return <View>
      <Text>Your password was successfully changed. Proceed to login!</Text>
    </View>
  } else if (isUsernameIncorrect) {
    return <View>
      <Text>Incorrect Username entered. Please go back and re-enter username!</Text>
    </View>
  } else {
    if (isCodeEntered) {
      return <EnterCodeForm
        username={username}
        setIsPasswordChanged={setIsPasswordChanged}
      />
    } else {
      return <EnterUsernameForm
        setUsername={setUsername}
        setIsCodeEntered={setIsCodeEntered}
        setIsUsernameIncorrect={setIsUsernameIncorrect}
      />
    }
  }

}

const EnterCodeForm: React.FC<{ username: string, setIsPasswordChanged: StateSetter<boolean> }> = ({ username, setIsPasswordChanged }) => {
  const [info, setInfo] = useState({ username, code: '', newPassword: '' })

  const onSubmit = async ({ username, code, newPassword }: { username: string, code: string, newPassword: string }) => {
    console.log(`
  Executing: onSubmit/EnterCodeForm/ResetPasswordForm
1. Request password change
2. Prompt user to login with the new password
`)
    try {
      Auth.forgotPasswordSubmit(username, code, newPassword)
      console.log('Completed #1')

      setIsPasswordChanged(true)
      console.log('Completed #2')

      console.log('Finished Executing: onSubmit/EnterCodeForm/ResetPasswordForm')
    } catch (err) {
      console.log('Error Origin: onSubmit/EnterCodeForm/ResetPasswordForm\n', err)
    }
  }
  return <>
    <View>
      <Text>Please enter the code you received in</Text>
      <Text>your email along with a new password</Text>
      <TextInput
        style={styles.input}
        placeholder='username'
        value={info.username}
        onChangeText={(text) => setInfo({ ...info, username: text })}
      />

      <TextInput
        style={styles.input}
        placeholder='code'
        value={info.code}
        onChangeText={(text) => setInfo({ ...info, code: text })}
      />

      <TextInput
        style={styles.input}
        placeholder='new password'
        value={info.newPassword}
        onChangeText={(text) => setInfo({ ...info, newPassword: text })}
      />
      {/* Submit button */}
      <TouchableOpacity onPress={() => onSubmit(info)} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

    </View>
  </>
}

const EnterUsernameForm: React.FC<{
  setIsCodeEntered: StateSetter<boolean>,
  setUsername: StateSetter<string>,
  setIsUsernameIncorrect: StateSetter<boolean>
}> = ({ setIsCodeEntered, setUsername, setIsUsernameIncorrect }) => {
  const navigation = useNav()
  const [inputText, setInputText] = useState('')

  const onSubmit = async (username: string) => {
    console.log(`
  Executing: onSubmit/EnterUsernameForm/ResetPasswordForm
1. Request reset password code
2. setUsername(username)
3. setIsCodeEntered(true)
  `)
    try {
      await Auth.forgotPassword(username)
      console.log('Completed #1')

      setUsername(username)
      console.log('Completed #2')

      setIsCodeEntered(true)
      console.log('Completed #3')

      console.log('Finished Executing: onSubmit/EnterUsernameForm/ResetPasswordForm')
    } catch (err) {
      setIsUsernameIncorrect(true)
      console.log('Error Origin: onSubmit/EnterUsernameForm/ResetPasswordForm\n', err)
    }
  }

  return <>
    <View>
      {/* texts */}
      <Text style={styles.topText}> Trouble logging in?</Text>
      <Text style={styles.bottomText}>Enter your username and we'll send you</Text>
      <Text style={styles.bottomText}>a link to get back into your account</Text>

      {/* form */}
      <TextInput
        style={styles.input}
        placeholder='username'
        value={inputText}
        onChangeText={setInputText}
      />

      {/* Submit button */}
      <TouchableOpacity onPress={() => onSubmit(inputText)} style={styles.button}>
        <Text style={styles.buttonText}>Send Login Link</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>

      {/* Link to Signup Screen */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.createNewLogin}>
        <Text style={{ fontWeight: 'bold', color: '#000' }}>Create New Login</Text>
      </TouchableOpacity>
    </View>
  </>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  topText: {
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  bottomText: {
    alignSelf: 'center'
  },
  input: {
    height: 35,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: '#d3d3d3',
    backgroundColor: '#fafafa',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#33a8ff',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff'
  },
  dividerContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#000'
  },
  dividerText: {
    marginHorizontal: 10
  },
  createNewLogin: {
    alignItems: 'center',
    marginTop: 30
  }
})

export default ResetPasswordForm
