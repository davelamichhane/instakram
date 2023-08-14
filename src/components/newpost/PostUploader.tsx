import { RouteProp, useRoute } from '@react-navigation/native';
import { API, Storage } from 'aws-amplify';
import { useState } from 'react';
import { View, Image, TextInput, Button } from 'react-native';
import { createPost } from '../../graphql/mutations';
import awsmobile from '../../aws-exports';
import { useNav } from '../../navigation/hooks';

const {
  aws_user_files_s3_bucket: bucket,
  aws_user_files_s3_bucket_region: region,
} = awsmobile;

const PostUploader: React.FC = () => {
  const [captionText, setCaptionText] = useState('');
  const navigation = useNav()
  const route = useRoute<RouteProp<{ params: { imageUri: string } }>>();
  const { imageUri } = route.params;

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
              imageUrl: `https://${bucket}.${region}.amazonaws.com/public/${fileName}`,
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
        source={{ uri: imageUri }}
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
        style={{ color: 'white', fontSize: 16, marginBottom: 10 }}
        onChangeText={text => setCaptionText(text)}
        value={captionText}
      />
      <Button onPress={() => uploadImage(captionText)} title="Share" />
    </View>
  );
};

export default PostUploader;
