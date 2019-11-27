import React, {Component} from 'react';
import {SafeAreaView, Text, View, FlatList, Alert} from 'react-native';
import {Input, Button, ListItem} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Modal, Loader, NoLogged} from '../../../utils/components';
import {criaLista, getLista, deletaLista} from '../action/action';

class MinhasListas extends Component {
  state = {nomeLista: '', showModal: false};

  componentDidMount() {
    const {logged} = this.props;
    if (logged) {
      this.props.getLista();
    }
  }

  componentDidUpdate(prevProps) {
    const {logged} = this.props;
    if (prevProps.logged !== logged && logged) {
      this.props.getLista();
    }
  }

  async criaLista() {
    const {nomeLista} = this.state;
    const nome = await AsyncStorage.getItem('usuario');
    const documento = await AsyncStorage.getItem('cpf');
    const obj_lista = {
      nome,
      documento,
      nome_lista: nomeLista,
    };
    this.props.criaLista(obj_lista);
    this.setState({showModal: false});
  }

  deletaLista(lista) {
    Alert.alert(
      lista.nome_lista,
      `Deseja excluir a lista ${lista.nome_lista}`,
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => this.props.deletaLista(lista.id_clube_minhas_listas),
        },
      ],
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    const {minhas_listas, loadProdutos, logged} = this.props;
    const {showModal, nomeLista} = this.state;
    return loadProdutos ? (
      <Loader />
    ) : !logged ? (
      <NoLogged navigate={navigate} />
    ) : (
      <>
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            onRefresh={() => this.props.getLista()}
            refreshing={loadProdutos}
            data={minhas_listas}
            renderItem={({item}) => (
              <ListItem
                onPress={() => navigate('DetalheLista', {...item})}
                onLongPress={() => this.deletaLista(item)}
                title={item.nome_lista}
                bottomDivider
                chevron
              />
            )}
            keyExtractor={item => item.id_clube_minhas_listas.toString()}
          />
          <ActionButton buttonColor="#bf0029">
            <ActionButton.Item
              buttonColor="#bf0029"
              title="Criar lista"
              onPress={() => this.setState({showModal: true})}>
              <Icon name="cart-plus" style={{color: '#FFF', fontSize: 18}} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#bf0029"
              title="Adicionar produto à uma lista"
              onPress={() => navigate('ProcuraProduto')}>
              <Icon name="search-plus" style={{color: '#FFF', fontSize: 18}} />
            </ActionButton.Item>
          </ActionButton>
        </SafeAreaView>
        <Modal
          onBackButtonPress={() => this.setState({showModal: false})}
          style={{margin: 0}}
          styleContent={{flex: 1}}
          show={showModal}>
          <View
            style={{
              backgroundColor: '#FFF',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'gray',
                fontSize: 22,
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Digite o nome da lista que {'\n'} deseja criar.
            </Text>
            <Input
              value={nomeLista}
              onChangeText={text => this.setState({nomeLista: text})}
              placeholder="Lista..."
            />
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'space-between',
              }}>
              <Button
                buttonStyle={{backgroundColor: '#bf0029'}}
                onPress={() => this.criaLista()}
                style={{width: 200}}
                title="Criar"
              />
              <Button
                buttonStyle={{backgroundColor: '#bf0029'}}
                onPress={() => this.setState({showModal: false})}
                style={{width: 200}}
                title="Cancelar"
              />
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({MinhasListas, LoginReducer}) => ({
  ...MinhasListas,
  ...LoginReducer,
});

const mapDispatchToProps = {criaLista, getLista, deletaLista};

export default connect(mapStateToProps, mapDispatchToProps)(MinhasListas);
