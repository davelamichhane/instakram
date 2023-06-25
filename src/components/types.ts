export type BottomTabsIconNameType =
  | 'Home'
  | 'Profile'
  | 'Shop'
  | 'Search'
  | 'Reel';
export type BottomTabsIconType = {
  name: BottomTabsIconNameType;
  active: string;
  inactive: string;
};

export type SingleItemFromUser<T extends string, S> = {
  data: {
    getUser: {
      [Key in T]: S;
    };
  };
};
