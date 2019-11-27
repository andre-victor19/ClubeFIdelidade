import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import style from '../style/lojas_css';

export default class ItemLoja extends Component {
  render() {
    const {lat, lng, nome, onSelect, id, ativo} = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          onSelect({
            index: parseInt(id, 10),
            region: {
              latitude: parseFloat(lat),
              longitude: parseFloat(lng),
              latitudeDelta: 0.0043,
              longitudeDelta: 0.0034,
            },
          })
        }>
        <View
          style={[
            style.containerItem,
            {backgroundColor: ativo ? '#bf0029' : 'transparent'},
          ]}>
          <Image
            source={{
              uri:
                'https://nossacara.com/arquivos/galerias/2010/abril/rondelli/DSC_0082.JPG',
            }}
            style={style.imagemItem}
          />
          <Text style={[style.textoItem, {color: ativo ? '#FFF' : '#000'}]}>
            {nome}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
