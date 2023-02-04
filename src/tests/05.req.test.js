import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter, renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Login from '../pages/Login';

describe('Testa o componente <App.js />', () => {
  it('Testa se a página inicial é a rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa component Login', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const { pathname } = history.location;
    const getLoginText = screen.getByText(/Login/i);
    const getEmailInput = screen.getByPlaceholderText(/exemplo@exemplo\.com/i);

    const mockEmail = 'algumacoisa@gmail.com';
    userEvent.type(getEmailInput, mockEmail);

    expect(pathname).toBe('/');
    expect(getLoginText).toBeInTheDocument();
    expect(getEmailInput.value).toBe(mockEmail);

    const mockPassword = screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*/i);
    userEvent.type(mockPassword, '123456');
    const getButton = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(getButton);
  });
});
