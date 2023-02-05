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

// action responsável por salvar as despesas
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: { expense },
});

// action responsável por deletar as despesas
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: { expenseId },
});
