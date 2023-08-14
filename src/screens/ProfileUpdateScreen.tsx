import { API, Storage } from 'aws-amplify';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateUser } from '../graphql/mutations';
import { setActiveTab } from '../store/generalSlice';
import awsmobile from '../aws-exports';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchData } from '../store/profileInfoSlice';
import { useNav } from '../navigation/hooks';

const initalObj = {
  name: '',
  bio: '',
  gender: '',
  pronouns: '',
};

const {
  aws_user_files_s3_bucket: bucket,
  aws_user_files_s3_bucket_region: region,
} = awsmobile;

const ProfileUpdateScreen: React.FC = () => {
  const [profileInfo, setProfileInfo] = useState(initalObj);
  const { username, profilePicKey } = useAppSelector(
    state => state.profileInfo.profile.getUser,
  );
  const dispatch = useAppDispatch();
  const navigation = useNav()
  // handle text change in input fields
  const handleChange = (text: string, field: string) => {
    setProfileInfo(prev => ({ ...prev, [field]: text }));
  };

  // handle submit button on top right
  const handleSubmit = async () => {
    console.log(username)
    console.log('1. update DB 2. fetch Data from DB 3. Set active Tab to profile')
    try {
      await API.graphql({
        query: updateUser,
        variables: {
          input: { username, ...profileInfo },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      console.log('Completed #1')
      setProfileInfo(initalObj);
      dispatch(fetchData({ username, thangs: ['name', 'bio', 'gender', 'pronouns'] }));
      console.log('Completed #2')
      dispatch(setActiveTab('profile'));
      console.log('Completed #3')
    } catch (e) {
      console.log('Error Origin: handelSubmit/ProfileUpdateScreen\n', e);
    }
  };

  // handle 'update profile pic' link
  const handleUpload = async () => {
    console.log(username)
    console.log('1. select photo from library 2. Upload photo to S3  3. Update DB about new image 4. Remove old image 5. Fetch data 6. Set activetab to home')
    try {
      // grab previous profile pic link so you can delete it after uploading a new one

      // launch image lib
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const imageUri = result.assets[0].uri;

        // upload pic
        const response = await fetch(imageUri);
        const imageBlob = await response.blob();
        const fileName = imageUri.split('/').pop();
        console.log('Completed #1')
        if (fileName) {
          await Storage.put(fileName, imageBlob, { contentType: 'image/jpeg' });
          console.log('Completed #2')
        }
        // update user info
        await API.graphql({
          query: updateUser,
          variables: {
            input: {
              username,
              profilePicKey: `https://${bucket}.s3.${region}.amazonaws.com/public/${fileName}`,
            },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        console.log('Completed #3')

        // Delete the previous photo from s3
        await Storage.remove(`public/${fileName}`);
        console.log('Completed #4')
        // fetch updated Data
        dispatch(fetchData({ username, thangs: ['profilePicKey'] }));
        console.log('Completed #5')
        dispatch(setActiveTab('home'));
        console.log('Completed #6')
      }
    } catch (e) {
      console.log('Error Origin: handleUpload/ProfileUpdateScreen\n', e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Go Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.headerText, { fontSize: 24, fontWeight: '200' }]}>
            X
          </Text>
        </TouchableOpacity>

        {/* Edit Profile Info Text */}
        <Text style={styles.headerText}>Edit Profile</Text>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={[styles.headerText, { color: '#0447cd' }]}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Pic */}
      <View style={styles.imageBox}>
        <Image
          source={profilePicKey ? { uri: profilePicKey } : require('../assets/profile_icon.jpg')}
          style={styles.image}
        />
        <TouchableOpacity style={{ marginVertical: 5 }} onPress={handleUpload}>
          <Text style={{ color: '#0447cd' }}>update profile pic</Text>
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
    backgroundColor: '#000',
    flex: 1
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
  imageBox: { alignItems: 'center' },
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
