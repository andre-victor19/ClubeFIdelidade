import React, {Component} from 'react';
import moment from 'moment';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {getHistorico} from '../action/action';
import {zeroPad, formataDinheiro} from '../../../utils/helpers/Functions';
import {HEIGHT} from '../../../utils/helpers/Contants';

function Item({
  produto,
  id_ai,
  codigo_produto,
  tipo,
  quantidade,
  valor,
  total,
}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>{zeroPad(id_ai + 1, 3)}</Text>
        <Text>{codigo_produto}</Text>
        <Text>{produto}</Text>
        <Text>{tipo}</Text>
        <Text>{quantidade}</Text>
      </View>
      <View
        style={{
          marginLeft: '10%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>R$ {formataDinheiro(valor)}</Text>
        <Text>R$ {formataDinheiro(total)}</Text>
      </View>
    </>
  );
}

class DetalheHistorico extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam(
      'Title',
      moment(navigation.state.params.data_compra.replace('Z', '')).format(
        'DD/MM/YYYY HH:mm:ss',
      ),
    ),
  });

  state = {historico: []};

  async componentDidMount() {
    const {params} = this.props.navigation.state;
    const {historico_detalhe} = this.props;
    const historico = historico_detalhe.find(
      detalhe => detalhe.cupom === params.cupom,
    );
    this.onChangeState('historico', historico);
  }

  onChangeState(state, value) {
    this.setState({[state]: value});
  }

  render() {
    const {historico} = this.state;
    return (
      <>
        <SafeAreaView style={{marginBottom: 50}}>
          <View
            style={{
              backgroundColor: '#f2f2f2',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>ITEM</Text>
              <Text>CÓDIGO</Text>
              <Text>DESCRIÇÃO</Text>
              <Text>TIPO</Text>
              <Text>QTD</Text>
            </View>
            <View
              style={{
                marginLeft: '10%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>VL UNIT</Text>
              <Text>VL ITEM</Text>
            </View>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={historico.produtos}
            keyExtractor={item => `${item.id_ai}`}
            renderItem={({item}) => (
              <ListItem title={<Item {...item} />} bottomDivider />
            )}
          />
        </SafeAreaView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            padding: 10,
            height: HEIGHT / 10,
            backgroundColor: '#f2f2f2',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Total</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            R$ {formataDinheiro(historico.valor_compra)}
          </Text>
        </View>
      </>
    );
  }
}

const mapStateToProps = ({HistoricoReducer}) => ({...HistoricoReducer});

const mapDispatchToProps = {getHistorico};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetalheHistorico);
