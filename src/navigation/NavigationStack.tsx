import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContainerScreen from '../screens/ContainerScreen';
import EmailVerification from '../screens/EmailVerificationScreen';
import GuestProfile from '../screens/GuestProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import NewPostScreen from '../screens/NewPostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileUpdateScreen from '../screens/ProfileUpdateScreen';
import SignupScreen from '../screens/SignupScreen';
import Temp from '../screens/TempScree';

const Stack = createNativeStackNavigator();
const screenOptions = {headerShown: false};

export const SignedInStack = () => {
  return (
    <Stack.Navigator initialRouteName="Container" screenOptions={screenOptions}>
      <Stack.Screen name="Container" component={ContainerScreen} />
      <Stack.Screen name="NewPost" component={NewPostScreen} />
      <Stack.Screen name="UpdateProfile" component={ProfileUpdateScreen} />
      <Stack.Screen name="GuestProfile" component={GuestProfile} />
      <Stack.Screen name="Temp" component={Temp} />
    </Stack.Navigator>
  );
};

export const SignedOutStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
    </Stack.Navigator>
  );
};
