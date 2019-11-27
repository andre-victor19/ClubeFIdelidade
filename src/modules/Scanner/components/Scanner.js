import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import style from '../style/scanner_css';
export class Scanner extends Component {
  static navigationOptions = {
    header: null,
  };

  renderCamera(navigate) {
    const isFocused = this.props.navigation.isFocused();

    if (!isFocused) {
      return null;
    } else if (isFocused) {
      return (
        <>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            onBarCodeRead={({data}) => navigate('ScannerDetalhe', {data})}
            style={style.camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permissão para usar a câmera.',
              message:
                'Nós precisamos da sua permissão para usar a sua câmera.',
              buttonPositive: 'Sim',
              buttonNegative: 'Não',
            }}
          />
          <BarcodeMask
            width={300}
            height={100}
            edgeBorderWidth={1}
            showAnimatedLine={false}
          />
        </>
      );
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return <View style={style.container}>{this.renderCamera(navigate)}</View>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withNavigationFocus(
  connect(mapStateToProps, mapDispatchToProps)(Scanner),
);
