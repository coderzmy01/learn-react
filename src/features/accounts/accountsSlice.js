const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        isLoading: false,
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
    case "account/converting":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

// action creator
export function deposit(amount, currency) {
  return async function (dispatch) {
    dispatch({ type: "account/converting" });
    // convert amount to RMB
    const data = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=CNY`,
    );
    const res = await data.json();
    console.log(res);
    const rmb = res.rates.CNY;
    dispatch({ type: "account/deposit", payload: rmb });
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function createLoan(amount, purpose) {
  return {
    type: "account/create_loan",
    payload: { amount, purpose },
  };
}
export function payLoan() {
  return { type: "account/pay_loan" };
}

export default accountReducer;
