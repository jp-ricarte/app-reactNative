const INITIAL_STATE = {
    user: null,
  };
  
  export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'SALVAR_USER':
        return {
          ...state,
          user: action.payload,
        };
        case 'SAIR':
        return {
          user: null,
        };
  
      default:
        return state;
    }
  }
  