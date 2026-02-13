const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/create_loan":
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
        loan: action.payload.amount,
      };
    case "account/pay_loan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}
export default accountReducer;
