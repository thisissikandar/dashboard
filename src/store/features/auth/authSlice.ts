import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
    deleteToken: (state) => {
      return { ...state, accessToken: "", refreshToken: "" };
    },
  },
});

export const { setToken, deleteToken } = authSlice.actions;

export default authSlice.reducer;
