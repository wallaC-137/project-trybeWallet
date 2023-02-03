/**
 * @param {*} array - array de objetos
 * @returns retorna a soma de todos os valores de um array
 */
const hofSumExpense = (array) => array.reduce((acc, curr) => acc + (Number(curr
  .value * curr.exchangeRates[curr.currency].ask)), 0);

export default hofSumExpense;
