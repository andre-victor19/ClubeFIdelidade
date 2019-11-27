import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Card, Button, Icon} from 'react-native-elements';
import {getOfertasPersonalizadas, ativarOferta} from '../action/action';
import {checaLogado} from '../../Login/action/action';
import {formataDinheiro} from '../../../utils/helpers/Functions';
import {Loader, NoLogged} from '../../../utils/components';
import style from '../style/minhasofertas_css';
import style_oferta from '../style/ofertas_css';

export class MinhasOfertas extends Component {
  state = {cpf: '', nomeLoja: ''};
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    const cpf = await AsyncStorage.getItem('cpf');
    const nomeLoja = await AsyncStorage.getItem('nomeLoja');
    this.onChangeState('nomeLoja', nomeLoja);
    token && this.props.checaLogado();
    if (cpf) {
      this.props.getOfertasPersonalizadas(cpf);
      this.onChangeState('cpf', cpf);
    }
  }

  async componentDidUpdate(prevProps) {
    const nomeLoja = this.props.navigation.getParam('nomeLoja');
    if (nomeLoja !== undefined && nomeLoja !== this.state.nomeLoja) {
      const nomeLoja = await AsyncStorage.getItem('nomeLoja');
      this.onChangeState('nomeLoja', nomeLoja);
    }
    if (this.props.logged !== prevProps.logged && this.props.logged) {
      const cpf = await AsyncStorage.getItem('cpf');
      if (cpf) {
        this.props.getOfertasPersonalizadas(cpf);
        this.onChangeState('cpf', cpf);
      }
    }
  }

  onChangeState(state, value) {
    this.setState({[state]: value});
  }

  render() {
    const {navigate} = this.props.navigation;
    const {logged, ofertas_personalizadas, load_produto} = this.props;
    const {cpf, nomeLoja} = this.state;

    return load_produto ? (
      <Loader />
    ) : !logged ? (
      <NoLogged navigate={navigate} />
    ) : (
      <SafeAreaView style={style_oferta.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => this.props.getOfertasPersonalizadas(cpf)}
              refreshing={load_produto}
            />
          }
          style={style_oferta.scrollContainer}>
          <View style={{alignItems: 'flex-start'}}>
            <Button
              title={nomeLoja ? `Loja: ${nomeLoja}` : 'Selecionar Loja'}
              type="clear"
              titleStyle={{fontSize: 14, color: '#bf0029', marginRight: 15}}
              iconRight={true}
              onPress={() => navigate('SelecionarLoja')}
              icon={
                <Icon
                  style={{marginLeft: 10}}
                  name="chevron-down"
                  size={24}
                  color="#bf0029"
                  type="material-community"
                />
              }
            />
          </View>
          {ofertas_personalizadas.preview.length > 0 ? (
            ofertas_personalizadas.preview.map((dt, key) => (
              <View style={{marginVertical: 20}} key={key}>
                <View style={style_oferta.containerLista}>
                  <Text style={style_oferta.tituloOferta}>
                    {dt.nome_oferta}
                  </Text>

                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigate('DetalheOferta', {
                        familia_codigo: dt.familia_codigo,
                        personalizado: true,
                      })
                    }>
                    <View style={style_oferta.botaoVerMais}>
                      <Text style={style_oferta.textoBotaoVerMais}>
                        Ver mais
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={dt.produtos.slice(0, 5)}
                  style={style_oferta.containerFlatList}
                  renderItem={({item}) => (
                    <Card
                      image={{
                        uri: `https://datasalesio-imagens.s3.amazonaws.com/imagem-produto/${item.ean}.jpg`,
                      }}>
                      <View style={style_oferta.containerInfo}>
                        <Text
                          numberOfLines={1}
                          style={style_oferta.nomeProduto}>
                          {item.produto}
                        </Text>
                      </View>
                      <View style={style_oferta.containerTexto}>
                        <Text style={style_oferta.preco}>
                          R$ {formataDinheiro(item.preco)}
                        </Text>
                        <Text style={style_oferta.preco_dois}>
                          R$ {formataDinheiro(item.preco_dois)}
                        </Text>
                      </View>
                      <View style={{marginTop: 20}}>
                        <Button
                          disabled={!!item.produto_ativo}
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
                    </Card>
                  )}
                  keyExtractor={item => `${item.id_ai}`}
                />
              </View>
            ))
          ) : ofertas_personalizadas.preview.length === 0 && !load_produto ? (
            <View style={style.sem_oferta}>
              <Text style={style.sem_oferta_texto}>
                Parece que não temos ofertas disponíveis para você. 😞
              </Text>
            </View>
          ) : (
            <View />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({LoginReducer, OfertasReducer}) => ({
  ...LoginReducer,
  ...OfertasReducer,
});

const mapDispatchToProps = {
  checaLogado,
  getOfertasPersonalizadas,
  ativarOferta,
};

export default connect(mapStateToProps, mapDispatchToProps)(MinhasOfertas);
