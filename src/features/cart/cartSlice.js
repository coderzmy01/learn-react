import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.pizzaId !== action.payload,
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    incrementQuantity: (state, action) => {
      const { pizzaId } = action.payload;
      const item = state.items.find(
        (item) => item.pizzaId === pizzaId,
      );
      if (item) {
        ++item.quantity;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    decrementQuantity: (state, action) => {
      const { pizzaId } = action.payload;
      const item = state.items.find(
        (item) => item.pizzaId === pizzaId,
      );
      if (item) {
        if (item.quantity <= 1) {
          cartSlice.caseReducers.removeFromCart(state, {
            payload: pizzaId,
          });
        } else {
          console.log(item, 'item');
          --item.quantity;
          item.totalPrice = item.unitPrice * item.quantity;
        }
      }
    },
  },
});
export const getTotalPizzaCount = (state) =>
  state.cart.items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
export const getTotalPrice = (state) =>
  state.cart.items.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0,
  );
export const getCartItems = (state) => state.cart.items;
export const getCurrentCountById = (state, pizzaId) => {
  if (
    state.cart.items.find(
      (item) => item.pizzaId === pizzaId,
    )
  ) {
    return (
      state.cart.items.find(
        (item) => item.pizzaId === pizzaId,
      )?.quantity ?? 0
    );
  }
};

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
