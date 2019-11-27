import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {RNS3} from 'react-native-s3-upload';
import Fetch from '../../../utils/helpers/Fetch';
import {asyncForEach} from '../../../utils/helpers/Functions';
import {API_URL_CLUBE} from '../../../utils/helpers/Contants';

const loadChecaCadastro = () => dispatch =>
  dispatch({type: 'LOAD_CHECA_CADASTRO'});

export const checaCadastro = cpf => async dispatch => {
  dispatch(loadChecaCadastro());
  try {
    const payload = await Fetch(`${API_URL_CLUBE}clube/validateCPF`, {cpf});

    dispatch({type: 'VALIDA_CPF', payload});
  } catch (err) {
    console.error(err);
  }
};

export const enviaCadastro = (cadastro, callback) => async dispatch => {
  dispatch(loadChecaCadastro());
  let arquivo = null;
  try {
    if (cadastro.pessoa.imagem_perfil) {
      const file = {
        uri: cadastro.pessoa.imagem_perfil.uri,
        name: cadastro.pessoa.imagem_perfil.fileName,
        type: cadastro.pessoa.imagem_perfil.type,
      };
      const options = {
        keyPrefix: 'imagens_perfil/',
        bucket: 'datasalesio-imagens',
        region: 'us-east-1',
        accessKey: 'AKIA4EJWG5VH6WJCS3GA',
        secretKey: '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',
        successActionStatus: 201,
      };
      arquivo = await RNS3.put(file, options);
    }

    const conta_pessoa = {
      ...cadastro.pessoa,
      img_profile: arquivo ? arquivo.body.postResponse.location : null,
      cpf: cadastro.pessoa.documento,
      data_nascimento: moment(
        cadastro.pessoa.data_nascimento,
        'DD/MM/YYYY',
      ).format('YYYY-MM-DD'),
      id_empresa: 395,
    };

    const payload = await Fetch(
      `${API_URL_CLUBE}clube/postCadastroPessoa`,
      conta_pessoa,
      'POST',
    );
    callback(payload);
    dispatch({type: 'CADASTRO_CLUBE', payload});
  } catch (err) {
    console.log(err);
  }
};

export const atualizaCadastro = ({pessoa}) => async dispatch => {
  try {
    dispatch(loadChecaCadastro());
    let arquivo = null;
    if (pessoa.imagem_perfil) {
      const file = {
        uri: pessoa.imagem_perfil.uri,
        name: pessoa.imagem_perfil.fileName,
        type: pessoa.imagem_perfil.type,
      };
      const options = {
        keyPrefix: 'imagens_perfil/',
        bucket: 'datasalesio-imagens',
        region: 'us-east-1',
        accessKey: 'AKIA4EJWG5VH6WJCS3GA',
        secretKey: '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',
        successActionStatus: 201,
      };
      arquivo = await RNS3.put(file, options);
    }
    const obj_atualiza = Object.entries(pessoa)
      .filter(psa => psa[1])
      .reduce((obj, psa) => ({...obj, [psa[0]]: psa[1]}), {});

    delete obj_atualiza.imagem_perfil;

    const conta_pessoa = {
      ...obj_atualiza,
      img_profile: arquivo
        ? arquivo.body.postResponse.location
        : obj_atualiza
        ? obj_atualiza.img_profile
        : null,
      cpf: obj_atualiza.documento,
      data_nascimento: moment(
        obj_atualiza.data_nascimento,
        'DD/MM/YYYY',
      ).format('YYYY-MM-DD'),
      id_empresa: 395,
    };
    console.log(conta_pessoa);
    await Fetch(`${API_URL_CLUBE}clube/putCadastro`, conta_pessoa, 'PUT');
    const novo_usuario = {
      documento: obj_atualiza.documento,
      senha: obj_atualiza.nova_senha || obj_atualiza.senha,
    };
    dispatch(efetuarLogin(novo_usuario));
  } catch (err) {
    console.log(err);
  }
};

export const efetuarLogin = (usuario, callback) => async dispatch => {
  try {
    dispatch(loadChecaCadastro());
    const login = {
      senha: usuario.senha,
      cpf: usuario.documento,
      id_empresa: 395,
    };
    const payload = await Fetch(
      `${API_URL_CLUBE}clube/loginPessoa`,
      login,
      'POST',
    );
    await AsyncStorage.clear();

    await asyncForEach(
      Object.entries(payload),
      async info => await AsyncStorage.setItem(info[0], info[1] || '0'),
    );
    if (callback) {
      callback(payload);
    }

    dispatch({type: 'LOGIN', payload});
  } catch (err) {
    console.log(err);
  }
};

export const changeFormLogin = (key, value) => dispatch =>
  dispatch({type: 'CHANGE_FORM_LOGIN', payload: {key, value}});

export const checaLogado = () => async dispatch => {
  let payload = {};
  const keys_storage = await AsyncStorage.getAllKeys();
  const value_storage = await AsyncStorage.multiGet(keys_storage);
  value_storage.forEach(val => Object.assign(payload, {[val[0]]: val[1]}));
  dispatch({type: 'LOGADO', payload});
};

export const deslogar = navigation => async dispatch => {
  await AsyncStorage.clear();
  navigation.navigate('Inicio');
  dispatch({type: 'DESLOGADO', payload: {}});
};
