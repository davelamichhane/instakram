import {ImageURISource} from 'react-native';

type obj = {
  [key: string]: {
    active: ImageURISource;
    inactive: ImageURISource;
  };
}

const images:obj = {
  home: {
    active: require('./home_active.png'),
    inactive: require('./home_inactive.png'),
  },
  search: {
    active: require('./search_active.png'),
    inactive: require('./search_inactive.png'),
  },
  reels: {
    active: require('./reels_active.png'),
    inactive: require('./reels_inactive.png'),
  },
  shop: {
    active: require('./shop_active.png'),
    inactive: require('./shop_inactive.png'),
  },
  profile: {
    active: require('./profile.jpg'),
    inactive: require('./profile.jpg'),
  },
};

export default images;
