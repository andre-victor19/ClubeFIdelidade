import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import style from './styleNoLogged';

export default ({navigate}) => (
  <>
    <View style={style.horizontal}>
      <Text style={style.textSecundario}>
        Acesse sua conta agora mesmo para aproveitar ofertas especiais feita
        para você.
      </Text>
      <View style={style.container_botao}>
        <Button
          onPress={() => navigate('ChecaCadastro')}
          title="Avançar"
          buttonStyle={{backgroundColor: '#081690'}}
        />
      </View>
    </View>
  </>
);
