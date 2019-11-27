import React, {Component} from 'react';
import {StatusBar, ImageBackground, Button, View} from 'react-native';
import style from '../style/inicio_css';

export default class App extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const {navigate} = this.props.navigation;

    return (
      <>
        <StatusBar backgroundColor="#bf0029" barStyle="light-content" />
        <ImageBackground
          source={require('../../../../assets/login.png')}
          style={style.background}>
          <View style={style.containerButton}>
            <Button
              color="#cb3838"
              title="Comece agora"
              onPress={() => navigate('App')}
            />
          </View>
        </ImageBackground>
      </>
    );
  }
}
