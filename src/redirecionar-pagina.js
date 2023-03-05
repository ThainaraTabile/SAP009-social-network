export const redirecionarPagina = (hash) => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };
  // fazendo o link das paginas com as hash.