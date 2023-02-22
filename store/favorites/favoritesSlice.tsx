import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dataCartProduct } from "../cart/cartSlice.types";
import { RootState } from "../store";
import { initialStateTypes } from "./favoritesSlice.types";

const initialState: initialStateTypes = {
  data: [],
  count: 0,

}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {

    addFavoritesProduct(state, action: PayloadAction<dataCartProduct>) {

      let sheckIdentical = state.data.some(
        (item) => item.id === action.payload.id
      );

      if (!sheckIdentical) {
        state.data = [...state.data, action.payload]
        ++state.count
      }
    },
    removeFavoritesProduct(state, action: PayloadAction<{ id: number, price: number }>) {

      const minusFavoritesProduct = state.data.filter((item) => item.id !== action.payload.id)
      state.data = minusFavoritesProduct
      --state.count

    },

  },
  extraReducers:
    (builder) => {
    },

});



export const { addFavoritesProduct, removeFavoritesProduct } = favoritesSlice.actions;
export const favoritesState = (state: RootState) => state.favorites
export const rootFavoritesProducts = (state: RootState) => state.favorites;
export const rootCountInFavorites = (state: RootState) => state.favorites.count;
export const rootDataFavorites = (state: RootState) => state.favorites.data;



export default favoritesSlice.reducer;