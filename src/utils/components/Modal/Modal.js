import React from 'react';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native';

export default props => (
  <Modal {...props} isVisible={props.show}>
    <SafeAreaView style={{...props.styleContent}}>
      {props.children}
    </SafeAreaView>
  </Modal>
);
