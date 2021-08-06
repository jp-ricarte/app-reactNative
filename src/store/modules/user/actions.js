export function salvarUser(user) {
    return {
      type: 'SALVAR_USER',
      payload: { user },
    };
  }

  export function sair() {
    return {
      type: 'SAIR',
    };
  }
    