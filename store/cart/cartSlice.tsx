import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { dataCartProduct, initialStateTypes } from './cartSlice.types';

const initialState: initialStateTypes = {
  products: [],
  totalCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<dataCartProduct>) {
      let sheckIdentical = state.products.some(
        (productItem) => productItem.data.id === action.payload.id
      );

      if (sheckIdentical) {
        state.products = state.products.map((productItem) => {
          if (productItem.data.id === action.payload.id) {
            productItem.data = action.payload;
            ++productItem.count;
          }
          return productItem;
        });
      } else {
        state.products = [
          ...state.products,
          { data: action.payload, count: 1 },
        ];
      }
      ++state.totalCount;
      state.totalPrice += action.payload.price;
      return state;
    },
    minusProduct(
      state,
      action: PayloadAction<{ id: number | string; price: number }>
    ) {
      if (state.totalCount !== 0) {
        const minusProduct = state.products.map((productItem) => {
          if (productItem.data.id === action.payload.id) {
            --productItem.count;
            --state.totalCount;
            state.totalPrice -= action.payload.price;
          }
          return productItem;
        });
        state.products = minusProduct.filter(
          (productItem) => productItem.count !== 0
        );
      }
    },
    removeProduct(
      state,
      action: PayloadAction<{
        id: number | string;
        price: number;
        quantity: number;
      }>
    ) {
      const newState = state.products.filter(
        (productItem) => productItem.data.id !== action.payload.id
      );
      state.totalCount -= action.payload.quantity;
      state.totalPrice -= action.payload.price * action.payload.quantity;
      state.products = newState;
    },
  },
  extraReducers: (builder) => {},
});

export const { addProduct, minusProduct, removeProduct } = cartSlice.actions;
export const cartState = (state: RootState) => state.cart;
export const rootProductsInCart = (state: RootState) => state.cart.products;
export const rootTotalCountInCart = (state: RootState) => state.cart.totalCount;

export default cartSlice.reducer;
