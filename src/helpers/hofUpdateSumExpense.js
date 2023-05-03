/**
 * responsável por atualizar o valor total de despesas
 * @param {*} state - estadp anterior
 * @param {*} action - action disparada com o id da despesa a ser deletada
 * @returns retorna o valor atualizado do total de despesas
 */
const hofUpdateSumExpense = (state, action) => {
  const val = state.expenses
    .find((decrementValue) => decrementValue.id === action.payload.expenseId);
  const finalValue = state.totalExpenses - Number(val
    .value * val.exchangeRates[val.currency].ask);
  return finalValue > 0 ? finalValue : 0;
};

export default hofUpdateSumExpense;
