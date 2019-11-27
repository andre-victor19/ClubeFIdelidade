import React from 'react';
import {ImageProfile} from './src/utils/components';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {fromRight} from 'react-navigation-transitions';
import Logado from './Logado';
import Inicio from './src/modules/Login/components/Inicio';
import Login from './src/modules/Login/components/Login';
import Ofertas from './src/modules/Ofertas/components/Ofertas';
import MinhasListas from './src/modules/MinhasListas/components/MinhasListas';
import ProcuraProduto from './src/modules/MinhasListas/components/ProcuraProduto';
import Scanner from './src/modules/Scanner/components/Scanner';
import ScannerDetalhe from './src/modules/Scanner/components/ScannerDetalhe';
import Opcoes from './src/modules/Opcoes/components/Opcoes';
import ChecaCadastro from './src/modules/Login/components/ChecaCadastro';
import Cadastro from './src/modules/Login/components/Cadastro';
import Historico from './src/modules/Historico/components/Historico';
import DetalheHistorico from './src/modules/Historico/components/DetalheHistorico';
import Lojas from './src/modules/Lojas/components/Lojas';
import Regulamento from './src/modules/Regulamento/components/Regulamento';
import DetalheOferta from './src/modules/Ofertas/components/DetalheOferta';
import SelecionarLoja from './src/modules/Ofertas/components/SelecionarLoja';
import DetalheLista from './src/modules/MinhasListas/components/DetalheLista';
import Sobre from './src/modules/Sobre/components/Sobre';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BottomMenu = createBottomTabNavigator(
  {
    Ofertas: {
      screen: Ofertas,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="shopping-basket" size={18} color={tintColor} />
        ),
      },
    },
    MinhasListas: {
      screen: MinhasListas,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="clipboard-list" size={18} color={tintColor} />
        ),
        tabBarLabel: 'Listas',
      },
    },
    Scanner: {
      screen: Scanner,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="barcode" size={18} color={tintColor} />
        ),
      },
    },
    Opções: {
      screen: Opcoes,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="cogs" size={18} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: '#bf0029',
      inactiveTintColor: '#BAB9B9',
      indicatorStyle: {backgroundColor: 'transparent'},
      style: {
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
      },
    },
  },
);

const MainNavigator = createStackNavigator(
  {
    Auth: {
      screen: props => <Logado {...props} />,
      navigationOptions: {headerLeft: null},
    },
    Inicio: {screen: Inicio, navigationOptions: {headerLeft: null}},
    App: {screen: BottomMenu, navigationOptions: {headerLeft: null}},
    ChecaCadastro: {
      screen: ChecaCadastro,
      navigationOptions: {headerLeft: null},
    },
    Cadastro: {screen: Cadastro, navigationOptions: {headerLeft: null}},
    Login: {screen: Login, navigationOptions: {headerLeft: null}},
    ScannerDetalhe: {
      screen: ScannerDetalhe,
    },
    Historico: {
      screen: Historico,
    },
    DetalheHistorico: {
      screen: DetalheHistorico,
    },
    Lojas: {
      screen: Lojas,
    },
    Regulamento: {
      screen: Regulamento,
    },
    Sobre: {
      screen: Sobre,
    },
    DetalheOferta: {
      screen: DetalheOferta,
    },
    SelecionarLoja: {
      screen: SelecionarLoja,
      navigationOptions: {
        title: 'Selecionar Loja',
      },
    },
    ProcuraProduto: {
      screen: ProcuraProduto,
    },
    DetalheLista: {
      screen: DetalheLista,
    },
  },
  {
    defaultNavigationOptions: {
      title: 'Clube Rondelli',
      headerStyle: {
        backgroundColor: '#bf0029',
        elevation: 0,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#FFF',
      headerRight: () => <ImageProfile />,
    },
    initialRouteName: 'Auth',
    transitionConfig: () => fromRight(),
  },
);

export default createAppContainer(MainNavigator);
