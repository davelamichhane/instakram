import {View, Text, StyleSheet, Image} from 'react-native';

const Splash: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/instagram_logo.png')}
      />
      <View style={styles.innerContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/headerTabIcons/header-logo.png')}
        />
        <Text style={styles.text}>We'll Steal Your Soul!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#fafafa',
  },
  image: {
    height: 100,
    width: 100,
  },
  text: {
    fontSize: 20,
    fontWeight: '200',
    color: '#afafaf',
    fontStyle:'italic'
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent:'space-around'
  },
  logo: {
    width: 100,
    height:50,
    resizeMode: 'contain',
    tintColor: 'pink',
  },
});

export default Splash;
