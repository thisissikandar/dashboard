import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);


export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
