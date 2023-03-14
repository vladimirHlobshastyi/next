import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { dataCartProduct, initialStateTypes } from "./cartSlice.types";


const initialState: initialStateTypes = {
  products: [],
  totalCount: 0,
  totalPrice: 0
}


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addProduct(state, action: PayloadAction<dataCartProduct>) {
      debugger
      let sheckIdentical = state.products.some(
        (item) => item.data.id === action.payload.id
      );

      if (sheckIdentical) {
        state.products = state.products.map((item) => {

          if (item.data.id === action.payload.id) {
            item.data = action.payload
            ++item.count;
          }
          return item;
        });
      } else {
        state.products = [...state.products, { data: action.payload, count: 1 }]
      }
      ++state.totalCount
      state.totalPrice += action.payload.price
      return state;

    },
    minusProduct(state, action: PayloadAction<{ id: number | string, price: number }>) {
      debugger
      if (state.totalCount !== 0) {
        const minusProduct = state.products.map((item) => {
          if (item.data.id === action.payload.id) {
            --item.count
            --state.totalCount
            state.totalPrice -= action.payload.price
          }
          return item
        })
        state.products = minusProduct.filter((item) => item.count !== 0)
      }
    },
    removeProduct(state, action: PayloadAction<{

      id: number | string, price: number, quantity: number
    }>) {
      debugger
      const newState = state.products.filter((item) => item.data.id !== action.payload.id)
      state.totalCount -= action.payload.quantity
      state.totalPrice -= action.payload.price * action.payload.quantity
      state.products = newState
    },
  },
  extraReducers:
    (builder) => {
    },

});



export const { addProduct, minusProduct, removeProduct } = cartSlice.actions;
export const cartState = (state: RootState) => state.cart
export const rootProductsInCart = (state: RootState) => state.cart.products
export const rootTotalCountInCart = (state: RootState) => state.cart.totalCount



export default cartSlice.reducer;


