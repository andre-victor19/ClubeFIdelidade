import Fetch from '../../../utils/helpers/Fetch';
import {API_URL_CLUBE} from '../../../utils/helpers/Contants';

const loadCarregaProduto = () => dispatch =>
  dispatch({type: 'LOAD_CARREGA_PRODUTO'});

export const getProdutoEAN = ean => async dispatch => {
  dispatch(loadCarregaProduto());
  try {
    const payload = await Fetch(`${API_URL_CLUBE}clube/getProdutoEAN`, {ean});
    dispatch({type: 'PRODUTO_EAN', payload});
  } catch (err) {
    console.error(err);
  }
};
