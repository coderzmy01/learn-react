function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
    );
  });
}

import { getAddress } from '../../services/apiGeocoding';
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
export const featchAddressAsync = createAsyncThunk(
  'user/featchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  },
);
const initialState = {
  status: 'idle',
  userName: 'zyming',
  address: null,
  position: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = 'success';
      state.userName = action.payload;
    },
    logout: (state) => {
      state.status = 'idle';
      state.userName = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(featchAddressAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        featchAddressAsync.fulfilled,
        (state, action) => {
          state.status = 'success';
          state.position = action.payload.position;
          state.address = action.payload.address;
        },
      )
      .addCase(
        featchAddressAsync.rejected,
        (state, action) => {
          state.status = 'error';
          state.errorMessage = action.payload.message;
        },
      );
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
