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
  const dispatch = useAppDispatch();

  useEffect(() => {
    const check = async () => {
      console.log(`
Executing: check/AuthNavigation.tsx inside a useEffect
1. Render splashscreen, log in with previously saved info, turn off splashscreen
2. Fetch user Data from DB
3. Set isLoggedIn to true (redux)
`);
      try {
        dispatch(setIsWaiting(true));
        await Auth.currentAuthenticatedUser({bypassCache: true});
        const {username} = await Auth.currentAuthenticatedUser();
        dispatch(setIsWaiting(false));
        console.log('Completed #1');

        dispatch(fetchData({username}));
        console.log('Completed #2');

        dispatch(setIsLoggedIn(true));
        console.log('Completed #3');

        console.log('Finished Executing: check/AuthNavigation.tsx');
      } catch (err) {
        dispatch(setIsWaiting(false));
        console.log('Error Origin: check/AuthNavigation.tsx\n', err);
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
