import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {getProdutoEAN} from '../action/action';
import {formataDinheiro} from '../../../utils/helpers/Functions';
import style from '../style/scanner_css';

export class ScannerDetalhe extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('Title', 'Clube Rondelli'),
  });

  async componentDidMount() {
    const {params} = this.props.navigation.state;

    if (params) {
      await this.props.getProdutoEAN(params.data);
      const {produto_ean} = this.props;

      await this.props.navigation.setParams({
        Title: produto_ean.PRODUTO || 'Produto não encontrado',
      });
    }
  }

  render() {
    const {params} = this.props.navigation.state;
    const {produto_ean, load_produto} = this.props;
    return load_produto && produto_ean ? (
      <View style={[style.container_load, style.horizontal]}>
        <ActivityIndicator size="large" color="#081690" />
      </View>
    ) : (
      <View style={style.horizontal}>
        <Card
          image={{
            uri: `https://datasalesio-imagens.s3.amazonaws.com/imagem-produto/${produto_ean.SEQEAN}.jpg`,
          }}>
          <View style={style.containerInfo}>
            <Text numberOfLines={1} style={style.nomeProduto}>
              {produto_ean.PRODUTO}
            </Text>
          </View>
          <View style={style.containerTexto}>
            <Text
              style={
                !produto_ean.PRECO_CLUBE_RONDELLI
                  ? style.preco_dois
                  : style.preco
              }>
              R$ {formataDinheiro(produto_ean.PRECO || 0)}
            </Text>
            {produto_ean.PRECO_CLUBE_RONDELLI ? (
              <Text style={style.preco_dois}>
                R$ {formataDinheiro(produto_ean.PRECO_CLUBE_RONDELLI || 0)}
              </Text>
            ) : (
              <View />
            )}
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ScannerReducer}) => ({...ScannerReducer});

const mapDispatchToProps = {getProdutoEAN};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScannerDetalhe);
