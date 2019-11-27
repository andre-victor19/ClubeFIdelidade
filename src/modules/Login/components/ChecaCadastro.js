import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, ToastAndroid, Image} from 'react-native';
import {WSnackBar} from 'react-native-smart-tip';
import {Input} from 'react-native-elements';
import {Loader} from '../../../utils/components';
import {changeFormLogin, checaCadastro} from '../action/action';
import {CPF} from '../../../utils/helpers/Mascaras';
import {ValidaCPF} from '../../../utils/helpers/validaDocumento';
import style from '../style/checa_cadastro_css';

class ChecaCadastro extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const {navigate} = this.props.navigation;
    const {dadosPessoais, loadChecaCadastro} = this.props;
    return loadChecaCadastro ? (
      <Loader />
    ) : (
      <>
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
              Digite abaixo o número do seu CPF.
            </Text>
          </View>
        </View>
        <View style={style.containerInput}>
          <Input
            keyboardType="numeric"
            onChangeText={async text => {
              this.props.changeFormLogin('documento', text);
              if (text.length === 11 || text.length === 14) {
                if (!ValidaCPF(text.replace(/\./g, ''))) {
                  WSnackBar.show(_snackBarOpts);
                } else {
                  await this.props.checaCadastro(text);
                  if (this.props.cadastrado) {
                    navigate('Login', {documento: text});
                  } else {
                    navigate('Cadastro', {documento: text});
                  }
                }
              }
            }}
            value={CPF(dadosPessoais.pessoa.documento)}
            placeholder="CPF"
          />
        </View>
      </>
    );
  }
}

const mapStateToProps = ({LoginReducer}) => ({...LoginReducer});

const mapDispatchToProps = {changeFormLogin, checaCadastro};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChecaCadastro);

const _snackBarOpts = {
  position: WSnackBar.position.TOP, // 1.TOP 2.CENTER 3.BOTTOM
  duration: WSnackBar.duration.LONG, //1.SHORT 2.LONG 3.INDEFINITE
  textColor: '#FFF',
  data: 'Documento informado é inválido.',
  backgroundColor: '#bf0029',
};
