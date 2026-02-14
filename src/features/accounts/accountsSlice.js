import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
// 使用redux toolkit 实现accountReducer
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.isLoading = false;
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    createLoan(state, action) {
      // payload:只接受一个参数，通常是一个对象
      /*
      如果需要多个参数处理：
      通过重写函数，提供一个prepare函数，用于处理多个参数
       prepare(amount, purpose) {
        return { payload: { amount, purpose } };
       },
       */
      state.balance += action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.loan = action.payload.amount;
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    converting(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, createLoan, payLoan, converting } =
  accountSlice.actions;

export default accountSlice.reducer;

// function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         isLoading: false,
//         balance: state.balance + action.payload,
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "account/create_loan":
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         loan: action.payload.amount,
//       };
//     case "account/pay_loan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/converting":
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }

// // action creator
//先自动导出自定义的action creator,而不是在createSlice中定义,这是一种简化处理；之后会用createAsyncThunk处理异步操作
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
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function createLoan(amount, purpose) {
//   return {
//     type: "account/create_loan",
//     payload: { amount, purpose },
//   };
// }
// export function payLoan() {
//   return { type: "account/pay_loan" };
// }

// export default accountReducer;
