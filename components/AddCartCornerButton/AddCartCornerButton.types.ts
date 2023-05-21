import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { dataCartProduct, initialStateTypes } from '../../store/cart/cartSlice.types';

export type OrderCheckButtonType = {
  productCount: number | false;
  dispatch: ThunkDispatch<
    {
      cart: initialStateTypes;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>;
  product: dataCartProduct;
};

export type OrderCartButtonType = {
  dispatch: ThunkDispatch<
    {
      cart: initialStateTypes;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>;
  product: dataCartProduct;
};
