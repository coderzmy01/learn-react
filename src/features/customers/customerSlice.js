import { createSlice } from "@reduxjs/toolkit";

const initialCustomerState = {
  fullName: "",
  nationalId: "",
};
const customerReducer = createSlice({
  name: "customer",
  initialState: initialCustomerState,
  reducers: {
    create(state, action) {
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createdAt = new Date().toISOString();
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});
// function customerReducer(state = initialCustomerState, action) {
//   switch (action.type) {
//     case "customer/create":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdAt: new Date().toISOString(),
//       };
//     case "customer/update_name":
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }
export const { create, updateName } = customerReducer.actions;
export default customerReducer.reducer;
