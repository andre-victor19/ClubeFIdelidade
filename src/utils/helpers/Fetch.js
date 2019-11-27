import axios from 'axios';
import {WSnackBar} from 'react-native-smart-tip';
import {TOKEN_RONDELLI} from '../../utils/helpers/Contants';

export default (url, data, method = 'GET', token, responseType) =>
  new Promise(resolve =>
    axios({
      responseType: responseType || 'json',
      method,
      params: method !== 'GET' ? null : data,
      url,
      data,
      headers: {
        Authorization: token ? token : TOKEN_RONDELLI,
      },
    })
      .then(response => {
        if (response.data.sucesso) {
          WSnackBar.show({
            ..._snackBarOpts,
            data: response.data.sucesso,
            backgroundColor: '#081690',
          });
        }

        if (response.data.alerta) {
          WSnackBar.show({
            ..._snackBarOpts,
            data: response.data.alerta,
            backgroundColor: '#bf0029',
          });
        }
        resolve(response.data);
      })
      .catch(error => {
        console.warn(error.response, 'error.response');

        resolve(error.response);
      }),
  );

const _snackBarOpts = {
  position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
  duration: WSnackBar.duration.LONG, //1.SHORT 2.LONG 3.INDEFINITE
  textColor: '#FFF',
};
