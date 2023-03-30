import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../types";
const url = "https://dummyjson.com/carts";

interface CartState {
  carts: Cart[];
  loading: boolean;
}

export const fetchData = createAsyncThunk<Cart[]>(
  "carts/getCarts",
  async () => {
    const response = await fetch(url);
    const data = await response.json();
    const dataArray = data.carts;
    return dataArray;
  }
);

export const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
    loading: false,
  } as CartState,
  reducers: {
    update: (state, action: PayloadAction<{ carts: Cart[] }>) => {
      state.carts = action.payload.carts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { update } = cartsSlice.actions;

export default cartsSlice.reducer;
