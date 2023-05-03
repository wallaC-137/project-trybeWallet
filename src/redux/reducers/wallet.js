// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EDITED_EXPENSE }
  from '../actions';
import hofSumExpense from '../../helpers/hofSumExpense';
import hofUpdateSumExpense from '../../helpers/hofUpdateSumExpense';
import hofEditExpense from '../../helpers/hofEditExpense';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalExpenses: 0,

};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload.currencies)
        .filter((cur) => (cur !== 'USDT')),
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expense],
      totalExpenses: hofSumExpense([...state.expenses, action.payload.expense]), // soma o valor da despesa com o total de despesas
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => action.payload.expenseId !== expense.id), // remove a despesa do array de despesas
      totalExpenses: hofUpdateSumExpense(state, action), // atualiza o valor total de despesas
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload.expenseId,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      expenses: hofEditExpense(state, action, state.idToEdit),
      editor: false,
      idToEdit: 0,
      totalExpenses: hofSumExpense([...hofEditExpense(state, action, state.idToEdit)]), // soma o valor da despesa com o total de despesas

    };
  default:
    return state;
  }
};

export default walletReducer;
