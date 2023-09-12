import { createSlice } from "@reduxjs/toolkit";
const initialState = { authData: null, errors: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuthData(state, action) {
      console.log(action.payload);
      localStorage.setItem("profile", JSON.stringify(action?.payload));
      state.authData = action?.payload;
      state.errors = null;
    },
    addErrors(state, action) {
      state.errors = action.payload.data;
    },
    logout(state) {
      localStorage.clear();
      state.authData = null;
    },
  },
});

export const authActons = authSlice.actions;
export default authSlice.reducer;
