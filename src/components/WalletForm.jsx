import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies } from '../redux/actions';

class WalletForm extends Component {
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

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <input
            type="number"
            name="expense-value"
            id="expense-value"
            placeholder="Valor da despesa"
            data-testid="value-input"
          />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Descrição da despesa"
            data-testid="description-input"
          />
          <select data-testid="currency-input">
            {currencies.length > 0 && currencies
              .map((currency) => (
                <option
                  key={ currency }
                  value={ currency }
                >
                  {currency}
                </option>
              ))}
          </select>
          <select data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
export default connect(mapStateToProps)(WalletForm);
