import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalExpense } = this.props;
    return (
      <div>
        <p data-testid="email-field">{`Usurario(a): ${email}`}</p>
        <p data-testid="total-field">{`${totalExpense.toFixed(2)}`}</p>
        <p data-testid="header-currency-field">Moeda: BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpense: state.wallet.totalExpenses,
});

Header.propTypes = {
  email: PropTypes.string,
  totalExpense: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
