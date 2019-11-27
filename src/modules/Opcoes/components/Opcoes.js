import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppLink from 'react-native-app-link';
import AsyncStorage from '@react-native-community/async-storage';
import {deslogar} from '../../Login/action/action';
import {CPF} from '../../../utils/helpers/Mascaras';
import {getInitials} from '../../../utils/helpers/Functions';
import style from '../style/opcoes_css';

const DATA = [
  {
    name: 'Histórico de compras',
    icon: 'history',
    screen: 'Historico',
    chevron: true,
  },
  {name: 'Lojas', icon: 'store-alt', screen: 'Lojas', chevron: true},
  {name: 'Regulamento', icon: 'scroll', screen: 'Regulamento', chevron: true},
  {name: 'Sobre', icon: 'exclamation-circle', screen: 'Sobre', chevron: true},
  {
    name: 'Whatsapp',
    deep_link:
      'whatsapp://send?text=Olá, gostaria de receber mais ofertas!&phone=+5519992546961',
    app: 'Whatsapp',
    icon: 'whatsapp',
    chevron: false,
  },
  {
    name: 'Facebook',
    deep_link: 'fb://page/137695826310272',
    app: 'Facebook',
    icon: 'facebook',
    chevron: false,
  },
  {name: 'Sair', icon: 'sad-tear', chevron: false},
];

async function onPressItem(item, navigation, deslogar) {
  try {
    if (item.name === 'Sair') {
      Alert.alert(
        'Não faça isso 😭',
        'Enquanto você estiver longe, estaremos preparando grandes ofertas pra você !!',
        [
          {text: 'Sair', onPress: () => deslogar(navigation)},
          {text: 'Cancelar'},
        ],
        {cancelable: false},
      );
    } else {
      if (item.deep_link) {
        await AppLink.maybeOpenURL(item.deep_link, {
          appName: item.app,
        });
      } else if (item.screen) {
        navigation.navigate(item.screen);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function Item({item, navigation, deslogar, logged}) {
  return (
    <ListItem
      onPress={() => onPressItem(item, navigation, deslogar)}
      title={item.name}
      leftIcon={<Icon name={item.icon} size={20} color="#999" />}
      bottomDivider
      chevron={item.chevron}
    />
  );
}

class Opcoes extends Component {
  state = {data: [], usuario: '', profile: '0', documento: ''};

  async componentDidMount() {
    if (this.props.logged) {
      const profile = await AsyncStorage.getItem('profile');
      const usuario = await AsyncStorage.getItem('usuario');
      const cpf = await AsyncStorage.getItem('cpf');
      this.onChangeState('documento', cpf);
      this.onChangeState('usuario', usuario);
      this.onChangeState('profile', profile);
      this.onChangeState('data', DATA);
    } else {
      this.onChangeState('data', DATA.slice(1, 6));
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.logged !== this.props.logged) {
      if (this.props.logged) {
        const profile = await AsyncStorage.getItem('profile');
        const usuario = await AsyncStorage.getItem('usuario');
        const cpf = await AsyncStorage.getItem('cpf');
        this.onChangeState('documento', cpf);
        this.onChangeState('usuario', usuario);
        this.onChangeState('profile', profile);
        this.onChangeState('data', DATA);
      } else {
        this.onChangeState('data', DATA.slice(1, 6));
      }
    }
  }

  onChangeState(key, value) {
    this.setState({[key]: value});
  }

  render() {
    const {
      logged,
      navigation: {navigate},
    } = this.props;
    const {data, profile, usuario, documento} = this.state;
    return (
      <>
        <View style={style.container_usuario}>
          {logged ? (
            <View style={style.container_info}>
              {profile !== '0' ? (
                <Avatar
                  onPress={() =>
                    navigate('Cadastro', {documento, atualiza: true})
                  }
                  showEditButton
                  containerStyle={{marginRight: 10}}
                  size={70}
                  rounded
                  source={{
                    uri: profile,
                  }}
                />
              ) : (
                <Avatar
                  onPress={() =>
                    navigate('Cadastro', {documento, atualiza: true})
                  }
                  showEditButton
                  title={getInitials(usuario)}
                  containerStyle={{marginRight: 10}}
                  size={70}
                  rounded
                />
              )}

              <View>
                <Text style={style.nome_usuario}> {this.props.usuario} </Text>
                <Text style={{marginLeft: 5, fontSize: 16, color: '#999'}}>
                  {CPF(this.props.cpf)}
                </Text>
              </View>
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={() => navigate('ChecaCadastro')}>
                <Text style={style.botao_cadastrar}>Cadastrar/Login</Text>
              </TouchableOpacity>
              <Text style={style.texto_secundario_botao}>
                Entre agora mesmo e receba ofertas especias feita para você !
              </Text>
            </>
          )}
        </View>

        <SafeAreaView style={style.container_safe_area}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => <Item {...this.props} item={item} />}
          />
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = ({LoginReducer}) => ({...LoginReducer});

const mapDispatchToProps = {deslogar};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Opcoes);
