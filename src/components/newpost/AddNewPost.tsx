import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNav } from '../../navigation/hooks';
import PostUploader from './PostUploader';

const AddNewPost: React.FC = () => {
  const navigation = useNav()
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.goBack}
            source={require('../../assets/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>New Post</Text>
      </View>
      <PostUploader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginRight: 25,
    fontWeight: '700',
  },
  goBack: {
    height: 30,
    width: 30,
  },
});
export default AddNewPost;
