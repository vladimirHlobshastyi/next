import { dataCartProduct } from '../store/cart/cartSlice.types';
import { initialStateTypes } from '../store/favorites/favoritesSlice.types';

const useIsFavorites = (
  favorites: initialStateTypes,
  product: dataCartProduct
) => {
  const countIsFavoritesArray = favorites.data.filter(
    (productItem) => productItem.id === product.id
  );

  if (favorites.count) {
    return countIsFavoritesArray.length ? true : false;
  }
  return false;
};

export default useIsFavorites;
