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
import {getOfertasPrecoDois} from '../action/action';
import {formataDinheiro} from '../../../utils/helpers/Functions';
import {Loader, Modal} from '../../../utils/components';
import style from '../style/ofertas_css';
class PrecoDois extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeLoja: null,
    };
  }
  async componentDidMount() {
    this.props.getOfertasPrecoDois();
    const nomeLoja = await AsyncStorage.getItem('nomeLoja');
    this.setState({nomeLoja});
  }

  async componentDidUpdate(prevProps, prevState) {
    const nomeLoja = this.props.navigation.getParam('nomeLoja');
    if (nomeLoja !== undefined && nomeLoja !== this.state.nomeLoja) {
      const nomeLoja = await AsyncStorage.getItem('nomeLoja');
      this.setState({nomeLoja});
    }
  }

  render() {
    const {nomeLoja} = this.state;
    const {ofertas_dois, load_ofertas} = this.props;
    const {navigate} = this.props.navigation;

    return load_ofertas ? (
      <Loader />
    ) : (
      <SafeAreaView style={style.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => this.props.getOfertasPrecoDois()}
              refreshing={load_ofertas}
            />
          }
          style={style.scrollContainer}>
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
          {ofertas_dois && ofertas_dois.preview.length > 0 ? (
            ofertas_dois.preview.map((dt, key) => (
              <View style={{marginVertical: 20}} key={key}>
                <View style={style.containerLista}>
                  <Text numberOfLines={1} style={style.tituloOferta}>
                    {dt.nome_oferta}
                  </Text>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigate('DetalheOferta', {
                        familia_codigo: dt.familia_codigo,
                        personalizado: false,
                      })
                    }>
                    <View style={style.botaoVerMais}>
                      <Text style={style.textoBotaoVerMais}>Ver mais</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={dt.produtos.slice(0, 5)}
                  style={style.containerFlatList}
                  renderItem={({item}) => (
                    <Card
                      image={{
                        uri: `https://datasalesio-imagens.s3.amazonaws.com/imagem-produto/${item.ean}.jpg`,
                      }}>
                      <View style={style.containerInfo}>
                        <Text numberOfLines={1} style={style.nomeProduto}>
                          {item.produto}
                        </Text>
                      </View>
                      <View style={style.containerTexto}>
                        <Text style={style.preco}>
                          R$ {formataDinheiro(item.preco)}
                        </Text>
                        <Text style={style.preco_dois}>
                          R$ {formataDinheiro(item.preco_dois)}
                        </Text>
                      </View>
                    </Card>
                  )}
                  keyExtractor={item => `${item.id_ai}`}
                />
              </View>
            ))
          ) : (
            <View style={style.listEmptyComponent}>
              <Text style={style.listEmptyText}>Nenhum resultado</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({OfertasReducer}) => ({...OfertasReducer});

const mapDispatchToProps = {getOfertasPrecoDois};

export default connect(mapStateToProps, mapDispatchToProps)(PrecoDois);
