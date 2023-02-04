import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    // const {
    //   description,
    //   tag,
    //   method,
    //   valor,
    //   moeda,
    //   cambio,
    //   valorConvertido,
    //   moedaDeConversao,
    // } = this.props;
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
        </table>
      </div>
    );
  }
}

const mapStateToProps = () => {

};

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
