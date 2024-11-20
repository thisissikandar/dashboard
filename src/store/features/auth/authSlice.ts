import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      return { ...state, token: action.payload };
    },
    deleteToken: (state, action: PayloadAction<string>) => {
      return { ...state, token: action.payload };
    },
  },
});

export const { setToken, deleteToken } = authSlice.actions;

export default authSlice.reducer;
