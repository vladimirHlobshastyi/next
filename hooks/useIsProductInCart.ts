import { useMemo } from 'react';
import { dataCartProduct } from '../store/cart/cartSlice.types';

type useIsProductInCartPropType =
  | []
  | {
      data: dataCartProduct;
      count: number;
    }[];

const useIsProductInCart = (products: useIsProductInCartPropType, product: dataCartProduct) => {
  const filteredProducts = useMemo(
    () => products.filter((productItem) => productItem.data.id === product.id),
    [products, product.id]
  );

  return filteredProducts.length ? filteredProducts[0].count : false;
};

export default useIsProductInCart;
