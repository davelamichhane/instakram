import {View, StyleSheet, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import BottomTabs from '../components/home/BottomTabs';
import Header from '../components/home/Header';
import Stories from '../components/home/Stories';
import Search from '../components/search/Search';
import Temp from './TempScree';
import {RootState} from '../store/configureStore';
import {ActiveTabType} from '../store/generalSlice';
import ProfileScreen from './ProfileScreen';

const ContainerScreen: React.FC = () => {
  const activeTab = useSelector<RootState, ActiveTabType>(
    state => state.general.activeTab,
  );
  const Display: React.FC<{activeTab: ActiveTabType}> = ({activeTab}) => {
    switch (activeTab) {
      case 'home':
        return (
          <View>
            <Header />
            <Stories />
          </View>
        );
      case 'search':
        return <Search />;
      case 'reels':
        return <Temp />;
      case 'shop':
        return <Temp />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <Temp />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <Display activeTab={activeTab} />
      <BottomTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
export default ContainerScreen;
