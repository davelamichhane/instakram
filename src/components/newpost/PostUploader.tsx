import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {API, Storage} from 'aws-amplify';
import {useState} from 'react';
import {View, Image, TextInput, Button} from 'react-native';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import {createPost} from '../../graphql/mutations';
import {RootState} from '../../store/configureStore';
import awsmobile from '../../aws-exports';

const {aws_user_files_s3_bucket: bucket, aws_user_files_s3_bucket_region:region} = awsmobile

const uploadSchema = Yup.object().shape({
  caption: Yup.string().max(2200, 'Caption has reaced max character!'),
});

const PostUploader: React.FC = () => {
  const [captionText, setCaptionText] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const imageUri = useSelector<RootState, string>(
    state => state.general.imageUri,
  );

  const uploadImage = async (caption: string) => {
    try {
      // upload picture
      const response = await fetch(imageUri);
      const imageBlob = await response.blob();

      const fileName = imageUri.split('/').pop();
      if (fileName) {
        const upload = await Storage.put(fileName, imageBlob, {
          contentType: 'image/jpeg',
        });

        // update caption
        await API.graphql({
          query: createPost,
          variables: {
            input: {
              caption: caption,
              imageUrl: `https://${bucket}.${region}.amazonaws.com/public/${fileName}`
            },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });

        // go to posts
        navigation.navigate('Home');
      } else {
        console.log('maybe something wrong with the imageUri!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Image
        source={{uri: imageUri}}
        style={{
          height: 350,
          width: 350,
          alignSelf: 'center',
          marginVertical: 20,
        }}
      />
      <TextInput
        placeholder="write a caption ..."
        placeholderTextColor="grey"
        multiline={true}
        style={{color: 'white', fontSize: 16, marginBottom: 10}}
        onChangeText={text => setCaptionText(text)}
        value={captionText}
      />
      <Button onPress={() => uploadImage(captionText)} title="Share" />
    </View>
  );
};

export default PostUploader;
