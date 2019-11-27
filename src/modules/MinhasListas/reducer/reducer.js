const INITIAL_STATE = {
  searchText: '',
  produtos: [],
  lista_produto: [],
  preview_produtos: [],
  minhas_listas: [],
  loadProdutos: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SEARCH_TEXT':
      const {key, value} = action.payload;
      return {...state, [key]: value};
    case 'PRODUTOS':
      return {
        ...state,
        produtos: action.payload.all,
        preview_produtos: action.payload.preview,
        loadProdutos: false,
      };
    case 'GET_LISTA':
      return {...state, minhas_listas: action.payload, loadProdutos: false};
    case 'ADD_PRODUTO_LISTA':
      return {
        ...state,
        loadProdutos: false,
      };

    case 'PRODUTO_LISTA':
      return {
        ...state,
        lista_produto: action.payload,
        loadProdutos: false,
      };
    case 'LOAD_PRODUTOS':
      return {...state, loadProdutos: true};
    default:
      return state;
  }
};
