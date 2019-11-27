const INITIAL_STATE = {
  lojas: [],
  ofertas_dois: {
    preview: [],
    todos: [],
  },
  ofertas_personalizadas: {
    preview: [],
    todos: [],
  },
  load_lojas: false,
  load_ofertas: false,
  load_produto: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOJAS':
      return {
        ...state,
        lojas: action.payload,
        load_lojas: false,
      };
    case 'OFERTAS_DOIS':
      return {
        ...state,
        ofertas_dois: {preview: action.payload, todos: action.payload},
        load_ofertas: false,
      };
    case 'OFERTAS_PERSONALIZADAS':
      return {
        ...state,
        ofertas_personalizadas: {
          preview: action.payload,
          todos: action.payload,
        },
        load_ofertas: false,
        load_produto: false,
      };
    case 'LOAD_LOJAS':
      return {...state, load_lojas: true};
    case 'LOAD_ATIVA_PRODUTO':
      return {...state, load_produto: true};
    case 'LOAD_OFERTAS':
      return {...state, load_ofertas: true};
    default:
      return state;
  }
};
