import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import {
  dataCartProduct,
  initialStateTypes,
} from "../../store/cart/cartSlice.types";

export type OrderCheckButton = {
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

export type OrderCartButton = {
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
