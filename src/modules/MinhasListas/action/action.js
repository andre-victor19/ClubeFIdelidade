import Fetch from '../../../utils/helpers/Fetch';
import {API_URL_CLUBE} from '../../../utils/helpers/Contants';
import AsyncStorage from '@react-native-community/async-storage';

const loadProdutos = () => dispatch => dispatch({type: 'LOAD_PRODUTOS'});

export const changeSearchText = (key, value, produtos) => dispatch => {
  dispatch(getProdutos(value, produtos));
  dispatch({type: 'SEARCH_TEXT', payload: {key, value}});
};

export const getProdutos = (produto, produtos) => async dispatch => {
  const dataListFiltro =
    produtos &&
    produtos.filter(data =>
      new RegExp(
        produto.toUpperCase().replace(/[[\].!'@,><|:\\;&*()_+=]/g, ''),
      ).test(String(data.PRODUTO).toUpperCase()),
    );
  if (dataListFiltro && dataListFiltro.length > 0) {
    dispatch({
      type: 'PRODUTOS',
      payload: {all: produtos, preview: dataListFiltro},
    });
  } else {
    dispatch(loadProdutos());
    try {
      const payload = await Fetch(`${API_URL_CLUBE}clube/getProdutos`, {
        produto,
      });
      dispatch({type: 'PRODUTOS', payload: {all: payload, preview: payload}});
    } catch (err) {
      console.error(err);
    }
  }
};

export const getLista = () => async dispatch => {
  try {
    dispatch(loadProdutos());
    const cpf = await AsyncStorage.getItem('cpf');
    const payload = await Fetch(`${API_URL_CLUBE}clube/getLista`, {cpf});
    dispatch({type: 'GET_LISTA', payload});
  } catch (err) {
    console.log(err);
  }
};

export const criaLista = lista => async dispatch => {
  try {
    dispatch(loadProdutos());
    await Fetch(`${API_URL_CLUBE}clube/postLista`, lista, 'POST');
    dispatch(getLista());
  } catch (err) {
    console.log(err);
  }
};

export const deletaLista = id_lista => async dispatch => {
  try {
    dispatch(loadProdutos());
    await Fetch(`${API_URL_CLUBE}clube/deleteLista`, {id_lista}, 'DELETE');
    dispatch(getLista());
  } catch (err) {
    console.log(err);
  }
};

export const addProdutoLista = produto => async dispatch => {
  try {
    dispatch(loadProdutos());
    const cpf = await AsyncStorage.getItem('cpf');
    await Fetch(
      `${API_URL_CLUBE}clube/postProdutoLista`,
      {...produto, cpf},
      'POST',
    );
    dispatch({type: 'ADD_PRODUTO_LISTA'});
  } catch (err) {
    console.log(err);
  }
};

export const getProdutoLista = id_lista => async dispatch => {
  try {
    dispatch(loadProdutos());
    const payload = await Fetch(`${API_URL_CLUBE}clube/getProdutoLista`, {
      id_lista,
    });
    dispatch({type: 'PRODUTO_LISTA', payload});
  } catch (err) {
    console.log(err);
  }
};

export const deletaProdutoLista = (id_produto, id_lista) => async dispatch => {
  try {
    dispatch(loadProdutos());
    await Fetch(
      `${API_URL_CLUBE}clube/deleteProdutoLista`,
      {id_lista: id_produto},
      'DELETE',
    );
    dispatch(getProdutoLista(id_lista));
  } catch (err) {
    console.log(err);
  }
};
