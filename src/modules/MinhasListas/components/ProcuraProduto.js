import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ListItem} from 'react-native-elements';
import {changeSearchText, getProdutos, addProdutoLista} from '../action/action';
import {SearchBar, Loader, Modal} from '../../../utils/components';
import {formataDinheiro} from '../../../utils/helpers/Functions';
import {HEIGHT} from '../../../utils/helpers/Contants';

class ProcuraProduto extends Component {
  static navigationOptions = ({
    navigation: {
      state: {params},
    },
  }) => ({
    header: (
      <SearchBar
        value={params ? params.searchText : ''}
        onChangeText={text =>
          params.changeSearchText('searchText', text, params.produtos)
        }
        placeholder="Pesquisar produtos..."
      />
    ),
  });

  state = {showModal: false, refresh: false, produto: ''};

  async componentDidMount() {
    await this.props.getProdutos();
    await this.props.navigation.setParams({
      searchText: '',
      changeSearchText: this.props.changeSearchText,
      produtos: this.props.produtos,
    });
  }

  async componentDidUpdate(prevProps) {
    const {searchText} = this.props;
    if (prevProps.searchText !== searchText) {
      await this.props.navigation.setParams({
        searchText,
        changeSearchText: this.props.changeSearchText,
        produtos: this.props.produtos,
      });
    }
  }

  addProdutoLista(lista) {
    const {produto} = this.state;
    const obj_produto = {
      id_produto: produto,
      id_lista: lista.id_clube_minhas_listas,
    };
    this.props.addProdutoLista(obj_produto);
    this.setState({showModal: false});
  }

  render() {
    const {loadProdutos, preview_produtos, minhas_listas} = this.props;
    const {showModal, refresh} = this.state;
    return loadProdutos ? (
      <Loader />
    ) : (
      <>
        <SafeAreaView style={{flex: 1}}>
          <SwipeListView
            data={preview_produtos.slice(0, 20)}
            keyExtractor={item => item.SEQEAN}
            refreshing={loadProdutos}
            onRefresh={() => this.props.getProdutos()}
            renderItem={({item}, rowMap) => (
              <ListItem
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
            renderHiddenItem={data => (
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({
                    showModal: true,
                    produto: data.item.SEQPRODUTO,
                  })
                }>
                <View
                  style={{
                    alignItems: 'flex-end',
                    backgroundColor: '#081690',
                    paddingVertical: 30,
                    paddingRight: 15,
                  }}>
                  <Text style={{color: '#FFF'}}>Adicionar{'\n'} produto</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            disableRightSwipe
            rightOpenValue={-100}
          />
        </SafeAreaView>
        <Modal
          onBackButtonPress={() => this.setState({showModal: false})}
          onSwipeComplete={() => this.setState({showModal: false})}
          swipeDirection="down"
          scrollOffsetMax={400 - 300}
          style={{justifyContent: 'flex-end', margin: 0, height: HEIGHT / 2}}
          show={showModal}>
          <FlatList
            data={minhas_listas}
            renderItem={({item}) => (
              <ListItem
                onPress={() => this.addProdutoLista(item)}
                title={item.nome_lista}
                bottomDivider
              />
            )}
            keyExtractor={item => item.id_clube_minhas_listas.toString()}
          />
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({MinhasListas}) => ({...MinhasListas});

const mapDispatchToProps = {changeSearchText, getProdutos, addProdutoLista};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProcuraProduto);
