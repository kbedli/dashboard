import { configureStore } from "@reduxjs/toolkit";
import cartsReducer from "./cartsSlice";

export interface RootState {
  carts: ReturnType<typeof cartsReducer>;
}

const store = configureStore({
  reducer: {
    carts: cartsReducer,
  },
});

export default store;
