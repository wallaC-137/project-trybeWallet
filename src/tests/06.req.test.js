import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Login page', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  it('Testa se o botão de login está habilitado', () => {
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(loginButton).toBeDisabled();
    userEvent.type(emailInput, 'testando@exemplo.com');
    userEvent.type(passwordInput, '123456');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
  });
});
