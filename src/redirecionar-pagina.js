export const redirecionarPagina = (hash) => {
  console.log(`redirecionando para ${hash}`);
  window.location.hash = hash;
  // window.dispatchEvent(new HashChangeEvent('hashchange'));
};
//   // fazendo o link das paginas com as hash.
