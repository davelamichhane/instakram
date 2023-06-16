/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/store/configureStore';
import awsconfig from './src/aws-exports'
import { Amplify } from 'aws-amplify';

Amplify.configure(awsconfig)

const TempApp = ()=>(
<Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => TempApp);
