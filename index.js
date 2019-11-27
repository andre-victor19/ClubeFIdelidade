import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true;
const Render = props => (
  <Provider store={store}>
    <App {...props} />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Render);
