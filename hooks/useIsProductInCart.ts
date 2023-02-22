import { dataCartProduct } from "../store/cart/cartSlice.types";

type useIsProductInCartPropType =
  | []
  | {
      data: dataCartProduct;
      count: number;
    }[];

const useIsProductInCart = (
  products: useIsProductInCartPropType,
  product: dataCartProduct
) => {
  const countProductsArray = products.filter(
    (item) => item.data.id === product.id
  );
  countProductsArray.length ? countProductsArray[0].count : false;
  if (countProductsArray.length) {
    return countProductsArray[0].count;
  }
  return false;
};

export default useIsProductInCart;
