import { dataCartProduct } from "../cart/cartSlice.types";

export type initialStateTypes = {
  data: Array<dataCartProduct> | [];
  count: number;
};
