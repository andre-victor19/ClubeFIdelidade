import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import OneSignal from 'react-native-onesignal';
import {Loader} from './src/utils/components';
import {API_URL_CLUBE} from './src/utils/helpers/Contants';
import Fetch from './src/utils/helpers/Fetch';

export default class Logado extends React.Component {
  constructor(props) {
    super(props);
    OneSignal.init('42207f52-3a83-4812-bca2-0723039972e7');
    OneSignal.addEventListener('ids', this.onIds);
    this.state = {logado: null};
  }

  async componentDidMount() {
    const {navigate} = this.props.navigation;

    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigate('App');
    } else {
      navigate('App');
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  async onIds(device) {
    try {
      const cpf = await AsyncStorage.getItem('cpf');
      if (cpf) {
        const push = {
          documento: cpf,
          id_push: device.userId,
        };

        await Fetch(`${API_URL_CLUBE}clube/putIdPush`, push, 'PUT');
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return this.state.logado === null && <Loader />;
  }
}
