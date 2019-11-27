const INITIAL_STATE = {
  dadosPessoais: {
    pessoa: {
      imagem_perfil: null,
      documento: '',
      nome: '',
      senha: '',
      confirma_senha: '',
      recebe_oferta: false,
    },
    cadastrado: false,
  },
  logged: false,
  loadChecaCadastro: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'VALIDA_CPF':
      const payload = {...action.payload};
      delete payload.pessoa;
      delete action.payload.pessoa.senha;
      const pessoa = {
        ...state.dadosPessoais.pessoa,
        ...action.payload,
      };
      return {
        ...state,
        ...payload,
        dadosPessoais: {
          pessoa: {
            ...state.dadosPessoais.pessoa,
            ...pessoa.pessoa,
          },
        },
        loadChecaCadastro: false,
      };

    case 'CHANGE_FORM_LOGIN':
      return {
        ...state,
        dadosPessoais: {
          pessoa: {
            ...state.dadosPessoais.pessoa,
            [action.payload.key]: action.payload.value,
          },
        },
      };
    case 'LOGIN':
      delete action.payload.token;

      return {
        ...state,
        ...action.payload,
        logged: true,
        loadChecaCadastro: false,
      };
    case 'LOGADO':
      delete action.payload.token;
      return {
        ...state,
        ...action.payload,
        logged: true,
        loadChecaCadastro: false,
      };
    case 'DESLOGADO':
      return {
        ...state,
        ...action.payload,
        logged: false,
        loadChecaCadastro: false,
      };
    case 'CADASTRO_CLUBE':
      return {...state, loadChecaCadastro: false};
    case 'LOAD_CHECA_CADASTRO':
      return {...state, loadChecaCadastro: true};
    default:
      return state;
  }
};
