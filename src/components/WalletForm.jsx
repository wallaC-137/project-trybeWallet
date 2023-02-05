import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies, addExpense, saveEditedExpense } from '../redux/actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  /**
   * Busca as moedas disponíveis na API e salva no GlobalState
   */
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(saveCurrencies(await this.fetchCurrencies()));
  }

  /**
   * Busca as moedas disponíveis na API e salva no GlobalState
   * @returns {Object} - Objeto com as moedas disponíveis
   */
  fetchCurrencies = async () => {
    const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await currencies.json();
    return response;
  };

  /**
   * Salva no state as informações do campo (usa o 'name' do campo como chave)
   * e chama a função de validação do campo
   * @param {Object} target - Objeto com as informações do campo
   */
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  /**
   * Adiciona uma nova despesa na chave 'expenses' do GlobalState
   */
  addNewExpense = async () => {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { dispatch, expenses, editor, idSaved } = this.props;
    const id = expenses.length;

    const newExpense = {
      id: editor ? idSaved : id, // confere se é editor é true, se for, usa o id salvo
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: editor ? expenses[idSaved]
        .exchangeRates : await this.fetchCurrencies(), // confere se é editor é true, se for, usa os valores salvos em exchangeRates, se não, busca os valores da API
    };

    if (editor) dispatch(saveEditedExpense(newExpense)); // confere se é editor é true, se for, usa a action saveEditedExpense
    if (!editor) dispatch(addExpense(newExpense)); // confere se é editor é true, se for, usa a action addExpense

    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { currencies, editor } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <div>
        <form>
          <input
            type="number"
            name="value"
            id="expenseValue"
            placeholder="Valor da despesa"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
          />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Descrição da despesa"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencies.length > 0 && currencies
              .map((mapCurrency) => (
                <option
                  key={ mapCurrency }
                  value={ mapCurrency }
                >
                  {mapCurrency}
                </option>
              ))}
          </select>
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            onClick={ this.addNewExpense }
            type="button"
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa'}

          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
  editor: PropTypes.bool,
  idSaved: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idSaved: state.wallet.idToEdit,
});
export default connect(mapStateToProps)(WalletForm);
