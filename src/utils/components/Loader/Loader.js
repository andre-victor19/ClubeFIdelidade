import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import style from './style';

export default () => (
  <View style={[style.container, style.horizontal]}>
    <ActivityIndicator size="large" color="#bf0029" />
  </View>
);
