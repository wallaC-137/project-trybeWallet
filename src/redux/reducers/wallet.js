// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case '':
    return state;
  default:
    return state;
  }
};

export default walletReducer;
