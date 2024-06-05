import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import { EVN } from "../constants/environments";
import cartReducer from "./reducer/cartReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  // configureStore sử dụng redux-thunk như default middleware
  // middleware: (getDefaultMiddleware) =>
  // 	getDefaultMiddleware().concat(thunkMiddleware),
  devTools: EVN === "development",
});

export default store;
