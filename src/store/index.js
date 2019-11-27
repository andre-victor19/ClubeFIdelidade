import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import LoginReducer from '../modules/Login/reducer/reducer';
import ScannerReducer from '../modules/Scanner/reducer/reducer';
import OfertasReducer from '../modules/Ofertas/reducer/reducer';
import HistoricoReducer from '../modules/Historico/reducer/reducer';
import MinhasListas from '../modules/MinhasListas/reducer/reducer';

const rootReducer = combineReducers({
  form: formReducer,
  LoginReducer,
  ScannerReducer,
  OfertasReducer,
  HistoricoReducer,
  MinhasListas,
});

export const authInterceptor = () => next => action => {
  if (action.payload && action.payload.statusCode === 401) {
    action.type = 'LOG_OUT';
  }
  return next(action);
};

export default createStore(
  rootReducer,
  applyMiddleware(thunk, authInterceptor),
);
