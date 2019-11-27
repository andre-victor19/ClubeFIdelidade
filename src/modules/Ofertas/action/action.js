import AsyncStorage from '@react-native-community/async-storage';
import Fetch from '../../../utils/helpers/Fetch';
import {API_URL_CLUBE} from '../../../utils/helpers/Contants';

const loadOfertas = () => dispatch => dispatch({type: 'LOAD_OFERTAS'});
const loadLojas = () => dispatch => dispatch({type: 'LOAD_LOJAS'});
const loadAtivaProduto = () => dispatch =>
  dispatch({type: 'LOAD_ATIVA_PRODUTO'});

export const getLojas = () => async dispatch => {
  dispatch(loadLojas());
  try {
    const payload = await Fetch(`${API_URL_CLUBE}clube/getLojas`, {
      idCompany: 395,
    });
    dispatch({type: 'LOJAS', payload});
  } catch (err) {
    console.error(err);
  }
};

export const getOfertasPrecoDois = () => async dispatch => {
  dispatch(loadOfertas());
  const idLoja = await AsyncStorage.getItem('idLoja');
  try {
    const payload = await Fetch(`${API_URL_CLUBE}clube/getOfertasPrecoDois`, {
      idLoja,
    });
    dispatch({type: 'OFERTAS_DOIS', payload});
  } catch (err) {
    console.error(err);
  }
};

export const getOfertasPersonalizadas = cpf => async dispatch => {
  dispatch(loadOfertas());
  const idLoja = await AsyncStorage.getItem('idLoja');
  try {
    const payload = await Fetch(
      `${API_URL_CLUBE}clube/getOfertasPersonalizadas`,
      {cpf, idLoja},
    );

    dispatch({type: 'OFERTAS_PERSONALIZADAS', payload});
  } catch (err) {
    console.error(err);
  }
};

export const ativarOferta = produto => async dispatch => {
  dispatch(loadAtivaProduto());

  try {
    await Fetch(
      `${API_URL_CLUBE}clube/ativaOfertaPersonalizada`,
      produto,
      'PUT',
    );
    dispatch(getOfertasPersonalizadas(produto.documento));
  } catch (err) {
    console.error(err);
  }
};
