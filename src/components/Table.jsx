import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableCard from './TableCard';

/**
 * @class - Responsável por renderizar as 'categorias' da tabela de despesas
 */
class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <TableCard { ...expense } />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  description: PropTypes.string,
  tag: PropTypes.string,
  method: PropTypes.string,
  valor: PropTypes.number,
  moeda: PropTypes.string,
  cambio: PropTypes.number,
  valorConvertido: PropTypes.number,
  moedaDeConversao: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Table);
