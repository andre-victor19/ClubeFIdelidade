import React, {Component} from 'react';
import {SafeAreaView, FlatList, Alert} from 'react-native';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import {getProdutoLista, deletaProdutoLista} from '../action/action';
import {formataDinheiro} from '../../../utils/helpers/Functions';
import {Loader} from '../../../utils/components';

class DetalheLista extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('Title', navigation.state.params.nome_lista),
  });

  async componentDidMount() {
    const {params} = this.props.navigation.state;
    this.props.getProdutoLista(params.id_clube_minhas_listas);
  }

  deleteProdutoLista(item) {
    const {params} = this.props.navigation.state;
    Alert.alert(item.PRODUTO, `Deseja excluir ${item.PRODUTO} da lista ?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () =>
          this.props.deletaProdutoLista(
            item.id_clube_lista_produto,
            params.id_clube_minhas_listas,
          ),
      },
    ]);
  }

  render() {
    const {lista_produto, loadProdutos} = this.props;
    const {params} = this.props.navigation.state;

    return loadProdutos ? (
      <Loader />
    ) : (
      <SafeAreaView>
        <FlatList
          refreshing={loadProdutos}
          onRefresh={() =>
            this.props.getProdutoLista(params.id_clube_minhas_listas)
          }
          renderItem={({item}) => (
            <ListItem
              onLongPress={() => this.deleteProdutoLista(item)}
              leftAvatar={{
                source: {
                  uri: `https://datasalesio-imagens.s3.amazonaws.com/imagem-produto/${item.SEQEAN}.jpg`,
                },
              }}
              title={item.PRODUTO}
              subtitle={`R$ ${formataDinheiro(item.PRECO)}`}
              bottomDivider
            />
          )}
          data={lista_produto}
          keyExtractor={item => item.SEQEAN}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({MinhasListas}) => ({...MinhasListas});

const mapDispatchToProps = {getProdutoLista, deletaProdutoLista};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetalheLista);
