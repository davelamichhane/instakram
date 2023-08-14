import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { useNav } from '../../navigation/hooks';

const Header: React.FC = () => {
const navigation = useNav()
  return (
    <View style={styles.container}>
      {/* Instagram Logo */}
        <Image
          style={styles.logo}
          source={require('../../assets/headerTabIcons/header-logo.png')}
        />

      <View style={styles.iconsContainer}>
        {/* Add post */}
        <TouchableOpacity
          onPress={async () => {
            try {
              const result = await launchImageLibrary({mediaType: 'photo'});
              if (result.assets && result.assets[0].uri) {
                const imageUri = result.assets[0].uri;
                navigation.navigate('NewPost', {imageUri});
              } else {
                console.log('cant find image');
              }
            } catch (error) {
              console.log(error);
            }
          }}>
          <Image
            source={require('../../assets/headerTabIcons/plus-2-math.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Messages */}
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            source={require('../../assets/headerTabIcons/facebook-messenger.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  unreadBadge: {
    backgroundColor: '#ff385c',
    position: 'absolute',
    left: 20,
    bottom: 10,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',
  },
});
export default Header;
