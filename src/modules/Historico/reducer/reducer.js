const INITIAL_STATE = {
  historico_header: [],
  historico_detalhe: [],
  historico_loader: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'HISTORICO_COMPRAS':
      return {
        ...state,
        historico_detalhe: action.payload,
        historico_header: action.payload.map(pay => ({
          cupom: pay.cupom,
          data_compra: pay.data_compra,
          quantidade: pay.quantidade,
        })),
        historico_loader: false,
      };
    case 'LOAD_HISTORICO':
      return {...state, historico_loader: true};
    default:
      return state;
  }
};
