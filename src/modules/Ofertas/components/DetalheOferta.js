import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {Card, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {getOfertasPersonalizadas, ativarOferta} from '../action/action';
import {checaLogado} from '../../Login/action/action';
import {formataDinheiro} from '../../../utils/helpers/Functions';
import {Loader} from '../../../utils/components';
import style_oferta from '../style/minhasofertas_css';
import style from '../style/ofertas_css';

export class MinhasOfertas extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('Title', 'Clube Rondelli'),
  });
  state = {ofertas: [], cpf: ''};
  async componentDidMount() {
    const cpf = await AsyncStorage.getItem('cpf');
    const {params} = this.props.navigation.state;
    let familia;

    if (!params.personalizado) {
      familia = this.props.ofertas_dois.todos.find(
        oferta => oferta.familia_codigo === params.familia_codigo,
      );
    } else {
      familia = this.props.ofertas_personalizadas.todos.find(
        oferta => oferta.familia_codigo === params.familia_codigo,
      );
    }

    await this.props.navigation.setParams({
      Title: familia.nome_oferta,
    });
    if (cpf) {
      this.onChangeState('cpf', cpf);
    }
    this.onChangeState('ofertas', familia);
  }

  onChangeState(state, value) {
    this.setState({[state]: value});
  }

  render() {
    const {load_produto} = this.props;
    const {params} = this.props.navigation.state;
    const {ofertas, cpf} = this.state;

    return (
      <SafeAreaView style={style_oferta.container}>
        {load_produto ? (
          <Loader />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ofertas.produtos}
            style={style.containerFlatList}
            renderItem={({item}) => (
              <Card
                image={{
                  uri: `https://datasalesio-imagens.s3.amazonaws.com/imagem-produto/${item.ean}.jpg`,
                }}>
                <View style={[style.containerInfo, {width: '100%'}]}>
                  <Text numberOfLines={1} style={style.nomeProduto}>
                    {item.produto}
                  </Text>
                </View>
                <View style={[style.containerTexto, {width: '100%'}]}>
                  <Text style={style.preco}>
                    R$ {formataDinheiro(item.preco)}
                  </Text>
                  <Text style={style.preco_dois}>
                    R$ {formataDinheiro(item.preco_dois)}
                  </Text>
                </View>
                {params.personalizado ? (
                  <View style={{marginTop: 20}}>
                    <Button
                      disabled={item.produto_ativo}
                      onPress={() =>
                        this.props.ativarOferta({
                          id_produto: item.id_produto,
                          documento: cpf,
                        })
                      }
                      title={
                        !item.produto_ativo
                          ? 'Ativar desconto'
                          : 'Desconto ativado'
                      }
                      buttonStyle={{backgroundColor: '#081690'}}
                    />
                  </View>
                ) : (
                  <View />
                )}
              </Card>
            )}
            keyExtractor={item => `${item.id_ai}`}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({OfertasReducer}) => ({
  ...OfertasReducer,
});

const mapDispatchToProps = {
  checaLogado,
  getOfertasPersonalizadas,
  ativarOferta,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MinhasOfertas);
