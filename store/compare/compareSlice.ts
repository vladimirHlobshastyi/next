import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dataCartProduct } from "../cart/cartSlice.types";
import { RootState } from "../store";
import { initialStateTypes } from "./compareSlice.types";

const initialState: initialStateTypes = {
  data: [],
  count: 0,
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addCompareProduct(state, action: PayloadAction<dataCartProduct>) {
      let sheckIdentical = state.data.some(
        (productItem) => productItem.id === action.payload.id
      );

      if (!sheckIdentical) {
        state.data = [...state.data, action.payload];
        ++state.count;
      }
    },
    removeCompareProduct(
      state,
      action: PayloadAction<{ id: string; price: number }>
    ) {
      const minusCompareProduct = state.data.filter(
        (productItem) => productItem.id !== action.payload.id
      );
      state.data = minusCompareProduct;
      --state.count;
    },
  },
  extraReducers: (builder) => {},
});

export const { addCompareProduct, removeCompareProduct } = compareSlice.actions;
export const compareState = (state: RootState) => state.compare;
export const rootCountInCompare = (state: RootState) => state.compare.count;

export default compareSlice.reducer;
