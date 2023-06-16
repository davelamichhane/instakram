import {Auth} from 'aws-amplify';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Splash from '../screens/SplashScreen';
import {RootState} from '../store/configureStore';
import {setIsLoggedIn, setIsWaiting} from '../store/generalSlice';
import {SignedInStack, SignedOutStack} from './NavigationStack';

const AuthNavigation = () => {
  const isLoggedIn = useSelector<RootState, boolean>(
    state => state.general.isLoggedIn,
  );
  const isWaiting = useSelector<RootState, boolean>(
    state => state.general.isWaiting,
  );
  const dispatch = useDispatch();

  // try to login with previous sessions
  useEffect(() => {
    const check = async () => {
      try {
        dispatch(setIsWaiting(true));
        await Auth.currentAuthenticatedUser({bypassCache: true});
        dispatch(setIsWaiting(false));
        dispatch(setIsLoggedIn(true));
      } catch (e) {
        dispatch(setIsWaiting(false))
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
