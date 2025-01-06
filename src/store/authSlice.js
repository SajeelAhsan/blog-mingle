import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status : false,
  userData: null
}
const authService = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    }
  }
})

export const {login, logout} = authService.actions;
export default authService.reducer;
