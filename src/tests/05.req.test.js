import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import App from '../App';
// import Login from '../pages/Login';
// import Header from '../components/Header';
import { initialState } from './helpers/mockStore';
import Wallet from '../pages/Wallet';
import hofSumExpense from '../helpers/hofSumExpense';

describe('Header component', () => {
  it('Testa os valores de Email e Total', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState, initialEntries: ['/carteira'] });
    const emailField = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');

    expect(emailField).toHaveTextContent('Usurario(a): example@email.com');
    expect(totalField).toHaveTextContent('50.50');

    const expensesField = screen.getByTestId('value-input');
    const descriptionField = screen.getByTestId('description-input');
    const currencyField = screen.getByTestId('currency-input');
    const methodField = screen.getByTestId('method-input');
    const tagField = screen.getByTestId('tag-input');
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(expensesField, '50');
    userEvent.type(descriptionField, 'Teste');
    userEvent.click(currencyField);
    const testCurrency = screen.getByText(/cad/i);
    userEvent.click(testCurrency);
    userEvent.click(methodField);
    const testMethod = screen.getByText(/cartão de crédito/i);
    userEvent.click(testMethod);
    userEvent.click(tagField);
    const testTag = screen.getByText(/lazer/i);
    userEvent.click(testTag);
    userEvent.click(addButton);

    waitFor(() => {
      const getBtnEdit = screen.getByTestId('edit-btn');
      const getBtnDelete = screen.getByTestId('delete-btn');

      expect(getBtnEdit).toBeInTheDocument();
      expect(getBtnDelete).toBeInTheDocument();

      userEvent.click(getBtnEdit);
      const editeExpense = screen.getByRole('button', { name: /editar despesa/i });

      userEvent.type(expensesField, '5');
      userEvent.type(descriptionField, 'Teste2');
      userEvent.click(editeExpense);

      userEvent.click(getBtnDelete);
      expect(getBtnDelete).not.toBeInTheDocument();
    });
    // const getBtnEdit = screen.getByTestId('edit-btn');
  });
});

describe('Login page', () => {
  it('Testa se o botão de login está habilitado', () => {
    const values = [{
      value: 5,
      currency: 'USD',
      exchangeRates: {
        USD: {
          ask: 5.5,
        },
      },
    }, {
      value: 5,
      currency: 'USD',
      exchangeRates: {
        USD: {
          ask: 5.5,
        },
      },
    }];
    const result = hofSumExpense(values);
    expect(result).toBe(55);
  });
});
