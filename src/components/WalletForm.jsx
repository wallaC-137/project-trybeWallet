import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  async componentDidMount() {
    console.log(await this.fetchCurrencies());
  }

  fetchCurrencies = async () => {
    const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await currencies.json();
    return response;
  };

  render() {
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
          {/* <select data-testid="currency-input">
            <option value="USD">USD</option>
          </select> */}

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
export default connect(mapStateToProps)(WalletForm);
