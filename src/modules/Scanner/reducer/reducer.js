const INITIAL_STATE = {
  produto_ean: false,
  load_produto: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'PRODUTO_EAN':
      console.log(action.payload);
      return {...state, load_produto: false, produto_ean: {...action.payload}};
    case 'LOAD_CARREGA_PRODUTO':
      return {...state, load_produto: true};
    default:
      return state;
  }
};
