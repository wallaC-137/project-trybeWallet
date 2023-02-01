// Coloque aqui suas actions
export const LOGIN_USER = 'LOGIN_USER';

export const saveEmail = (email) => ({
  type: LOGIN_USER,
  payload: email,
});
