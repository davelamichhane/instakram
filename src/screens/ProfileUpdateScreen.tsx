import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {API} from 'aws-amplify';
import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../graphql/mutations';
import {RootState} from '../store/configureStore';
import {setActiveTab} from '../store/generalSlice';

const initalObj = {
  name: '',
  bio: '',
  gender: '',
  pronouns: '',
};

const ProfileUpdateScreen: React.FC = () => {
  const [profileInfo, setProfileInfo] = useState(initalObj);
  const username = useSelector<RootState, string>(
    state => state.profileInfo.username,
  );
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  // handle text change in input fields
  const handleChange = (text: string, field: string) => {
    setProfileInfo(prev => ({...prev, [field]: text}));
  };

  // handle submit button on top right
  const handleSubmit = async () => {
    try {
      if (!profileInfo || !username) {
        console.log('invalid profileInfor or Username');
        console.log('username: ', username);
        console.log('profileInfo: ', profileInfo);
        return;
      }
      await API.graphql({
        query: updateUser,
        variables: {
          input: {username, ...profileInfo},
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      setProfileInfo(initalObj);
      dispatch(setActiveTab('home'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Go Back Button */}
        <TouchableOpacity>
          <Text style={[styles.headerText, {fontSize: 24, fontWeight: '200'}]}>
            X
          </Text>
        </TouchableOpacity>

        {/* Edit Profile Info Text */}
        <Text style={styles.headerText}>Edit Profile</Text>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={[styles.headerText, {color: '#0447cd'}]}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Pic */}
      <View style={styles.imageBox}>
        <Image
          source={require('../assets/bottomTabIcons/profile.jpg')}
          style={styles.image}
        />
        <TouchableOpacity style={{marginVertical: 5}}>
          <Text style={{color: '#0447cd'}}>update profile pic</Text>
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => handleChange(text, 'name')}
      />
      <Divider />

      {/* Bio */}
      <Text style={styles.label}>Bio</Text>
      <TextInput
        multiline={true}
        maxLength={2200}
        style={styles.input}
        onChangeText={text => handleChange(text, 'bio')}
      />
      <Divider />

      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => handleChange(text, 'gender')}
      />
      <Divider />

      {/* Pronouns */}
      <Text style={styles.label}>Pronouns</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => handleChange(text, 'pronouns')}
      />
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 0,
  },
  input: {
    padding: 3,
    color: '#fff',
  },
  imageBox: {alignItems: 'center'},
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  headerText: {
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: '500',
  },
});

export default ProfileUpdateScreen;
