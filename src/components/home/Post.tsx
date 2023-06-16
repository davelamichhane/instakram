import {View, Text, StyleSheet, Image} from 'react-native';
import {Divider} from 'react-native-elements';

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/like.png',
    likedImageUrl: 'https://img.icons8.com/ios-glyphs/90/fa414a/like.png',
  },
  {
    name: 'Comment',
    imageUrl:
      'https://img.icons8.com/material-outlined/60/ffffff/speech-bubble.png',
  },
  {
    name: 'Share',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/paper-plane.png',
  },
  {
    name: 'Save',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/save.png',
  },
];

const Post: React.FC = ({post}) => (
  <View style={{marginBottom: 30}}>
    <Divider width={1} orientation="vertical" />

    {/* Post Header */}
    <View
style={{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:5,
        alignItems:'center'
      }}
    >
<View style={{flexDirection:'row', alignItems:'center'}} >
        <Image source={{uri:post.profile_picture}} style={styles.postHeader} />
      </View>
    </View>
  </View>
);

const PostHeader: React.FC = ({post}) => <View></View>;

const PostImage:React.FC = ({post}) => <View></View>

const PostFooter:React.FC = ({post}) => <View></View>

const Likes:React.FC = ({post}) => <View></View>

const PostFooter:React.FC = ({post}) => <View></View>

const styles = StyleSheet.create({
  postHeader: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  text: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 600,
  },
  post: {
    height: '100%',
    resizeMode: 'cover',
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
});
export default Post;
