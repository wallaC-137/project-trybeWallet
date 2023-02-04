import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @class - Responsável por renderizar as 'linhas' da tabela de despesas
 */
export class TableCard extends Component {
  render() {
    const { description, tag, method, value, exchangeRates, currency } = this.props;
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
          <button type="button">Excluir</button>
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
