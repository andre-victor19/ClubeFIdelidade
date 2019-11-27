import React, {Component} from 'react';
import moment from 'moment';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {getHistorico} from '../action/action';
import {Loader} from '../../../utils/components';

moment.locale('pt-BR');
class Historico extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('Title', 'Histórico de compras'),
  });

  state = {cpf: ''};

  async componentDidMount() {
    await this.props.navigation.setParams({
      Title: 'Histórico de compras',
    });
    const cpf = await AsyncStorage.getItem('cpf');
    if (cpf) {
      this.props.getHistorico(cpf);
      this.setState({cpf});
    }
  }

  render() {
    const {historico_loader, historico_header} = this.props;
    const {navigate} = this.props.navigation;
    const {cpf} = this.state;

    return historico_loader ? (
      <Loader />
    ) : (
      <SafeAreaView>
        <FlatList
          refreshing={historico_loader}
          onRefresh={() => this.props.getHistorico(cpf)}
          showsVerticalScrollIndicator={false}
          data={historico_header}
          keyExtractor={item => item.cupom}
          renderItem={({item}) => (
            <ListItem
              onPress={() =>
                navigate('DetalheHistorico', {
                  cupom: item.cupom,
                  data_compra: item.data_compra,
                })
              }
              title={moment(item.data_compra.replace('Z', '')).format(
                'DD/MM/YYYY HH:mm',
              )}
              leftIcon={{name: 'list'}}
              badge={{
                value: parseInt(item.quantidade, 10),
                textStyle: {color: '#FFF', fontWeight: 'bold'},
                badgeStyle: {backgroundColor: '#bf0029', padding: 5},
              }}
              bottomDivider
              chevron
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({HistoricoReducer}) => ({...HistoricoReducer});

const mapDispatchToProps = {getHistorico};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Historico);
