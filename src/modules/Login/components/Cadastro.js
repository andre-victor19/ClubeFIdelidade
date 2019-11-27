import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Picker} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Avatar} from 'react-native-elements';
import {Celular, CEP, Data} from '../../../utils/helpers/Mascaras';
import {
  checaCadastro,
  changeFormLogin,
  enviaCadastro,
  atualizaCadastro,
} from '../action/action';
import {getInitials} from '../../../utils/helpers/Functions';
import {GENEROS} from '../../../utils/helpers/Contants';
import PesquisaCEP from '../../../utils/helpers/CEP';
import {Loader} from '../../../utils/components';
import style from '../style/cadastro_css';

class Cadastro extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.enableButtonAvancar = this.enableButtonAvancar.bind(this);
    this.state = {avatarSource: ''};
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.props.checaCadastro(navigation.getParam('documento'));
  }

  enableButtonAvancar() {
    const {pessoa} = this.props.dadosPessoais;
    const {params} = this.props.navigation.state;
    if (!params.atualiza) {
      if (
        pessoa.nome &&
        pessoa.data_nascimento &&
        pessoa.celular1 &&
        pessoa.senha &&
        pessoa.confirma_senha &&
        pessoa.recebe_oferta
      ) {
        if (pessoa.senha === pessoa.confirma_senha) {
          return false;
        }
        return true;
      }
      return true;
    } else {
      if (pessoa.senha) {
        if (pessoa.nova_senha && pessoa.nova_senha !== pessoa.confirma_senha) {
          return true;
        }
        return false;
      }
      return true;
    }
  }

  cadastraUsuario() {
    const {navigate} = this.props.navigation;
    const {params} = this.props.navigation.state;
    if (!params.atualiza) {
      this.props.enviaCadastro(this.props.dadosPessoais, response => {
        if (response.sucesso) {
          navigate('Login', {
            documento: this.props.dadosPessoais.pessoa.documento,
          });
        }
      });
    } else {
      this.props.atualizaCadastro(this.props.dadosPessoais);
    }
  }

  selectImage() {
    const options = {
      title: 'Selecione uma foto de perfil',
      cancelButtonTitle: 'cancelar',
      takePhotoButtonTitle: 'Tirar foto de perfil',
      chooseFromLibraryButtonTitle: 'Escolher uma foto da galeria',
      permissionDenied: {
        title: 'Permissão negada',
        text:
          'Para poder tirar fotos com sua câmera e escolher imagens da sua biblioteca.',
        reTryTitle: 'tentar novamente',
        okTitle: 'ok',
      },
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        this.props.changeFormLogin('imagem_perfil', response);
        this.setState({
          avatarSource: source,
          base64: response.data,
        });
      }
    });
  }

  render() {
    const {dadosPessoais, loadChecaCadastro} = this.props;
    const {params} = this.props.navigation.state;
    return loadChecaCadastro ? (
      <Loader />
    ) : (
      <KeyboardAwareScrollView>
        <View style={style.containerInfo}>
          <Text style={style.textTitulo}>
            {params.atualiza ? 'Atualize seu cadastro' : 'Falta pouco!'}
          </Text>
          <Text style={style.textSecundario}>
            {params.atualiza
              ? 'Deixe seu cadastro sempre atualizado para continuar recebendo ofertas.'
              : 'Conte um pouco mais sobre você para finalizar seu cadastro.'}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Avatar
              onPress={() => this.selectImage()}
              showEditButton
              size={110}
              rounded
              source={this.state.avatarSource || {uri: this.props.profile}}
              title={getInitials(dadosPessoais.pessoa.nome)}
            />
          </View>
          <TextInput
            placeholder="Nome completo"
            style={style.input}
            value={dadosPessoais.pessoa.nome}
            onChangeText={text => this.props.changeFormLogin('nome', text)}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Data de nascimento"
            style={style.input}
            value={dadosPessoais.pessoa.data_nascimento}
            onChangeText={text =>
              this.props.changeFormLogin('data_nascimento', Data(text))
            }
          />
          <Picker
            style={style.input}
            selectedValue={dadosPessoais.pessoa.sexo}
            onValueChange={genero => this.props.changeFormLogin('sexo', genero)}
            mode="dialog">
            {GENEROS.map(genero => (
              <Picker.Item label={genero.label} value={genero.value} />
            ))}
          </Picker>
          <TextInput
            keyboardType="phone-pad"
            placeholder="Número de celular"
            style={style.input}
            value={Celular(dadosPessoais.pessoa.celular1)}
            onChangeText={text => this.props.changeFormLogin('celular1', text)}
          />
          <TextInput
            placeholder="E-mail"
            style={style.input}
            value={dadosPessoais.pessoa.email1}
            onChangeText={text => this.props.changeFormLogin('email1', text)}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="CEP"
            style={style.input}
            value={CEP(dadosPessoais.pessoa.cep)}
            onChangeText={text => {
              this.props.changeFormLogin('cep', text);
              if (text.length >= 8) {
                PesquisaCEP(text, (key, value) =>
                  this.props.changeFormLogin(key, value),
                );
              }
            }}
          />
          <TextInput
            placeholder="Endereço"
            style={style.input}
            value={dadosPessoais.pessoa.endereco}
            onChangeText={text => this.props.changeFormLogin('endereco', text)}
          />
          <TextInput
            placeholder="Bairro"
            style={style.input}
            value={dadosPessoais.pessoa.bairro}
            onChangeText={text => this.props.changeFormLogin('bairro', text)}
          />
          <TextInput
            placeholder="Cidade"
            style={style.input}
            value={dadosPessoais.pessoa.cidade}
            onChangeText={text => this.props.changeFormLogin('cidade', text)}
          />
          <TextInput
            maxLength={2}
            placeholder="UF"
            style={style.input}
            value={dadosPessoais.pessoa.uf}
            onChangeText={text => this.props.changeFormLogin('uf', text)}
          />
          <TextInput
            secureTextEntry
            placeholder="Senha"
            style={style.input}
            value={dadosPessoais.pessoa.senha}
            onChangeText={text => this.props.changeFormLogin('senha', text)}
          />

          {!params.atualiza ? (
            <TextInput
              secureTextEntry
              placeholder="Confirmar senha"
              style={style.input}
              value={dadosPessoais.pessoa.confirma_senha}
              onChangeText={text =>
                this.props.changeFormLogin('confirma_senha', text)
              }
            />
          ) : (
            <>
              <TextInput
                secureTextEntry
                placeholder="Nova senha"
                style={style.input}
                value={dadosPessoais.pessoa.nova_senha}
                onChangeText={text =>
                  this.props.changeFormLogin('nova_senha', text)
                }
              />
              <TextInput
                secureTextEntry
                placeholder="Confirmar nova senha"
                style={style.input}
                value={dadosPessoais.pessoa.confirma_senha}
                onChangeText={text =>
                  this.props.changeFormLogin('confirma_senha', text)
                }
              />
            </>
          )}
          {!params.atualiza ? (
            <View style={style.containerCheckbox}>
              <CheckBox
                value={dadosPessoais.pessoa.recebe_oferta}
                tintColors={{true: '#081690'}}
                onValueChange={check =>
                  this.props.changeFormLogin('recebe_oferta', check)
                }
              />
              <Text style={style.textCheckbox}>
                Ao se cadastrar você aceita receber promoções por SMS, Email e
                WhatsApp ?
              </Text>
            </View>
          ) : (
            <View />
          )}

          <TouchableOpacity
            onPress={() => this.cadastraUsuario()}
            disabled={this.enableButtonAvancar()}
            style={
              this.enableButtonAvancar()
                ? style.disableAvancar
                : style.enableAvancar
            }>
            <Text
              style={
                this.enableButtonAvancar()
                  ? style.textDisableAvancar
                  : style.textAvancar
              }>
              {params.atualiza ? 'Atualizar' : 'Avançar'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({LoginReducer}) => ({...LoginReducer});

const mapDispatchToProps = {
  checaCadastro,
  changeFormLogin,
  enviaCadastro,
  atualizaCadastro,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);
