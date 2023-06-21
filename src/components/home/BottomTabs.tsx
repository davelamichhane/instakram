import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import images from '../../assets/bottomTabIcons/images';
import {ActiveTabType, setActiveTab} from '../../store/generalSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks';

const iconNames: ActiveTabType[] = [
  'home',
  'search',
  'reels',
  'shop',
  'profile',
];
const BottomTabs = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.general.activeTab);
  const profileInfo = useAppSelector(
    state => state.profileInfo.profile.getUser,
  );
  const profilePicKey = profileInfo.profilePicKey

  const Icon: React.FC<{icon: ActiveTabType}> = ({icon}) => {
    const mode = activeTab === icon ? 'active' : 'inactive';
    const handlePress = (icon: ActiveTabType) => {
      dispatch(setActiveTab(icon));
    };
    return (
      <TouchableOpacity onPress={() => handlePress(icon)}>
        <Image
          style={[
            styles.icon,
            icon === 'profile' ? {borderRadius: 50} : null,
            icon === 'profile' && activeTab === 'profile'
              ? {borderColor: 'white', borderWidth: 2}
              : null,
          ]}
          source={
            icon === 'profile'
              ? profilePicKey
                ? {uri: profilePicKey}
                : require('../../assets/profile_icon.jpg')
              : images[icon][mode]
          }
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {iconNames.map((icon, index) => (
          <Icon icon={icon} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: 999,
    backgroundColor: '#000',
    bottom: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default BottomTabs;
