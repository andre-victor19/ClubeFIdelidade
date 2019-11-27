import Fetch from '../../../utils/helpers/Fetch';
import {API_URL_CLUBE} from '../../../utils/helpers/Contants';

const loadHistorico = () => dispatch => dispatch({type: 'LOAD_HISTORICO'});

export const getHistorico = cpf => async dispatch => {
  dispatch(loadHistorico());
  try {
    const payload = await Fetch(`${API_URL_CLUBE}clube/getHistorico`, {cpf});

    dispatch({type: 'HISTORICO_COMPRAS', payload});
  } catch (err) {
    console.error(err);
  }
};
