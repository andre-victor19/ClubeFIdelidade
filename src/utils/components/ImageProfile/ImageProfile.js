import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {getInitials} from '../../../utils/helpers/Functions';

class ImageProfile extends Component {
  state = {profile: '0', usuario: ''};
  async componentDidMount() {
    const profile = await AsyncStorage.getItem('profile');
    const usuario = await AsyncStorage.getItem('usuario');

    if (profile !== '0') {
      this.onChangeState('profile', profile);
    } else if (usuario) {
      this.onChangeState('usuario', usuario);
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.logged !== prevProps.logged) {
      const profile = await AsyncStorage.getItem('profile');
      const usuario = await AsyncStorage.getItem('usuario');

      if (profile !== '0') {
        this.onChangeState('profile', profile);
      } else if (usuario) {
        this.onChangeState('usuario', usuario);
      }
    }
  }

  onChangeState(state, value) {
    this.setState({[state]: value});
  }

  render() {
    const {profile, usuario} = this.state;
    return profile ? (
      <Avatar
        containerStyle={{marginRight: 10}}
        size={40}
        rounded
        source={{uri: profile}}
      />
    ) : usuario ? (
      <Avatar
        containerStyle={{marginRight: 10}}
        size={40}
        rounded
        title={getInitials(usuario)}
      />
    ) : (
      <View />
    );
  }
}

const mapStateToProps = ({LoginReducer}) => ({...LoginReducer});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageProfile);
