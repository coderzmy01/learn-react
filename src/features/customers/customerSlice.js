const initialCustomerState = {
  fullName: "",
  nationalId: "",
};
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
export default customerReducer;
