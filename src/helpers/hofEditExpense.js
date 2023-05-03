/**
 * @param {*} expenses - objeto com o estado antigo da aplicação
 * @param {*} edit - objeto com o novo estado da aplicação
 * @param {*} id - id da despesa a ser editada
 * @returns um array com o objeto atualizado
 */
const hofEditExpense = (expenses, edit, id) => {
  const editedExpense = edit.payload.update;
  return expenses.expenses.map((expense, idx) => {
    if (idx === id) return { ...expense.expense, ...editedExpense };
    return expense;
  });
};

export default hofEditExpense;
