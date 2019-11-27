import React, {Component} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {getLojas, getOfertasPrecoDois} from '../action/action';
import {checaLogado} from '../../Login/action/action';
import {Loader, SearchBar} from '../../../utils/components';
import style_oferta from '../style/minhasofertas_css';
import style from '../style/ofertas_css';

export class MinhasOfertas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idLoja: null,
      querry: '',
      filterData: [],
      filter: false,
    };

    this.onSearch = this.onSearch.bind(this);
  }
  async componentDidMount() {
    this.props.getLojas();
    const idLoja = await AsyncStorage.getItem('idLoja');
    this.setState({idLoja});
  }

  async onSelectLoja(id_loja, cnpj, nome_loja) {
    await AsyncStorage.multiSet([
      ['idLoja', id_loja.toString()],
      ['lojaCnpj', cnpj.toString()],
      ['nomeLoja', nome_loja],
    ]);
    this.setState({idLoja: id_loja.toString()});
    this.props.navigation.navigate('Ofertas', {nomeLoja: nome_loja});
    this.props.getOfertasPrecoDois();
  }

  onSearch(value) {
    this.setState({querry: value, filter: true}, () => {
      const data = this.props.lojas;
      const newData = data.filter(lojas =>
        lojas.nome_loja.includes(this.state.querry),
      );
      this.setState({filterData: newData});
    });
  }

  render() {
    const {load_lojas, lojas} = this.props;
    const {querry, filterData} = this.state;

    return (
      <SafeAreaView style={style_oferta.container}>
        {load_lojas ? (
          <View style={style_oferta.loadContainer}>
            <Loader />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={querry.length > 0 ? filterData : lojas}
            style={style.containerFlatList}
            ListHeaderComponent={
              <SearchBar
                onChangeText={this.onSearch}
                value={querry}
                placeholder="Pesquisar loja"
                inputStyle={{backgroundColor: '#bf0029', color: '#fff'}}
                containerStyle={{
                  backgroundColor: '#fff',
                  borderWidth: 0,
                  shadowColor: '#FFF',
                  borderBottomColor: 'transparent',
                  borderTopColor: 'transparent',
                }}
                inputContainerStyle={{
                  backgroundColor: '#bf0029',
                }}
              />
            }
            renderItem={({item}) => (
              <ListItem
                key={item.id_loja}
                // leftAvatar={{source: {uri: l.avatar_url}}}
                onPress={() =>
                  this.onSelectLoja(
                    item.id_loja,
                    item.codigo_erp,
                    item.nome_loja,
                  )
                }
                title={item.nome_loja}
                subtitle={`${item.cidade} - ${item.uf}`}
                rightIcon={
                  item.id_loja.toString() === this.state.idLoja && {
                    name: 'check',
                    type: 'material',
                    color: '#4caf50',
                  }
                }
                bottomDivider
              />
            )}
            keyExtractor={item => `${item.id_loja}`}
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
  getLojas,
  getOfertasPrecoDois,
};

export default connect(mapStateToProps, mapDispatchToProps)(MinhasOfertas);
