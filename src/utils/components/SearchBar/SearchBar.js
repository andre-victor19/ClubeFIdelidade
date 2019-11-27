import React from 'react';
import {SearchBar} from 'react-native-elements';

export default props => (
  <SearchBar
    searchIcon={{color: '#FFF'}}
    clearIcon={{color: '#FFF'}}
    placeholderTextColor="#FFF"
    inputStyle={{backgroundColor: '#bf0029', color: '#FFF'}}
    containerStyle={{
      backgroundColor: '#bf0029',
      borderWidth: 0,
      shadowColor: '#FFF',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
    }}
    inputContainerStyle={{backgroundColor: '#bf0029'}}
    {...props}
  />
);
