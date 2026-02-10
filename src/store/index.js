import { createStore, combineReducers } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialCustomerState = {
  fullName: "",
  nationalId: "",
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
function customerReducer(state = initialCustomerState, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: new Date().toISOString(),
      };
    case "customer/update_name":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);
console.log(store.getState(), "initial store");
// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState().balance, "after deposit");

// function withdraw(payload) {
//   store.dispatch({ type: "account/withdraw", payload });
// }
// withdraw(200);
// console.log(store.getState().balance, "after withdraw");
// function deposit(payload) {
//   store.dispatch({ type: "account/deposit", payload });
// }
// deposit(300);
// console.log(store.getState().balance, "after deposit");
// function createLoan(payload) {
//   store.dispatch({ type: "account/create_loan", payload });
// }
// createLoan({ amount: 1000, purpose: "Buy a car" });
// console.log(store.getState().balance, "after create loan");
// function payLoan() {
//   store.dispatch({ type: "account/pay_loan" });
// }
// payLoan();
// console.log(store.getState().balance, "after pay loan");
store.dispatch({
  type: "customer/create",
  payload: {
    fullName: "John Doe",
    nationalId: "1234567890",
  },
});
console.log(store.getState().customer, "after create customer");
export default store;
