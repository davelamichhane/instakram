import {Auth} from 'aws-amplify';
import {useEffect} from 'react';
import Splash from '../screens/SplashScreen';
import {setIsLoggedIn, setIsWaiting} from '../store/generalSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fetchData} from '../store/profileInfoSlice';
import {SignedInStack, SignedOutStack} from './NavigationStack';

const AuthNavigation = () => {
  const isLoggedIn = useAppSelector(state => state.general.isLoggedIn);
  const isWaiting = useAppSelector(state => state.general.isWaiting);
  const activeTab = useAppSelector(state=>state.general.activeTab)
    console.log(activeTab)
  const dispatch = useAppDispatch();
  // try to login with previous sessions
  useEffect(() => {
    const check = async () => {
      try {
        dispatch(setIsWaiting(true));
        await Auth.currentAuthenticatedUser({bypassCache: true});
        const {username} = await Auth.currentAuthenticatedUser();
        dispatch(setIsWaiting(false));

        dispatch(fetchData({username}));

        dispatch(setIsLoggedIn(true));
      } catch (e) {
        dispatch(setIsWaiting(false));
        console.log(e);
      }
    };
    check();
  }, []);

  if (isWaiting) {
    return <Splash />;
  } else {
    if (isLoggedIn) return <SignedInStack />;
    return <SignedOutStack />;
  }
};

export default AuthNavigation;
