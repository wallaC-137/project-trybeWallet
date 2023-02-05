import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

/**
 * @class - Responsável por renderizar as 'linhas' da tabela de despesas
 */
class TableCard extends Component {
  /**
   * @method - Responsável por realizar o dispatch do Id para deletar a despesa
   */
  deleteExpense = () => {
    const { dispatch, id } = this.props;
    dispatch(deleteExpense(id));
  };

  render() {
    const { id, description, tag, method, value, exchangeRates, currency } = this.props;
    return (
      <>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{Number(value).toFixed(2)}</td>
        <td>{exchangeRates[currency].name}</td>
        <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
        <td>{(exchangeRates[currency].ask * value).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button type="button">Editar</button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.deleteExpense(id) }
          >
            Excluir

          </button>
        </td>
      </>
    );
  }
}

TableCard.propTypes = {
  description: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  exchangeRates: PropTypes.shape({
    USD: PropTypes.shape({
      name: PropTypes.string,
      ask: PropTypes.number,
    }),
  }),
}.isRequired;

export default connect()(TableCard);
