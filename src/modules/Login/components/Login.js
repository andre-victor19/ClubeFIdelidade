import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {changeFormLogin, efetuarLogin} from '../action/action';
import {CPF} from '../../../utils/helpers/Mascaras';
import {Loader} from '../../../utils/components';
import style from '../style/checa_cadastro_css';

class ChecaCadastro extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {documento: ''};
  componentDidMount() {
    const {params} = this.props.navigation.state;
    this.props.changeFormLogin('documento', params.documento);
  }

  login() {
    const {navigate} = this.props.navigation;
    const {pessoa} = this.props.dadosPessoais;
    this.props.efetuarLogin(pessoa, response => {
      if (response.token) {
        navigate('Ofertas');
      }
    });
  }

  render() {
    const {dadosPessoais, loadChecaCadastro} = this.props;
    return (
      <>
        <KeyboardAwareScrollView>
          <View style={style.containerLogo}>
            <Image
              style={style.imageLogo}
              source={{
                uri:
                  'https://datasalesio-imagens.s3.amazonaws.com/iconeClubeRondelli.png',
              }}
            />
          </View>
          <View style={style.containerBemVindo}>
            <View>
              <Text style={style.textBemVindo}> Bem-vindo! </Text>
              <Text style={style.textSecundario}>
                Quer receber vantagens exclusivas ?
              </Text>
              <Text style={style.textSecundario}>
                Insira seu CPF e sua senha para continuar.
              </Text>
            </View>
          </View>
          <View style={style.containerInput}>
            <Input disabled value={CPF(dadosPessoais.pessoa.documento)} />
            <Input
              secureTextEntry
              placeholder="Senha"
              value={dadosPessoais.pessoa.senha}
              onChangeText={text => this.props.changeFormLogin('senha', text)}
            />
            <View style={style.buttonLogin}>
              {loadChecaCadastro ? (
                <Loader />
              ) : (
                <Button
                  onPress={() => this.login()}
                  title="Avançar"
                  buttonStyle={{backgroundColor: '#081690'}}
                />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }
}

const mapStateToProps = ({LoginReducer}) => ({...LoginReducer});

const mapDispatchToProps = {changeFormLogin, efetuarLogin};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChecaCadastro);
