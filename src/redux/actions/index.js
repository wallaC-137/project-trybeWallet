// Coloque aqui suas actions

// action responsável por salvar o email
export const LOGIN_USER = 'LOGIN_USER';
export const saveEmail = (email) => ({
  type: LOGIN_USER,
  payload: { email },
});

// action responsável por salvar as moedas
export const CURRENCIES = 'CURRENCIES';
export const saveCurrencies = (currencies) => ({
  type: CURRENCIES,
  payload: { currencies },
});
