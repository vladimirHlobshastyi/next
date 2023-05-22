import { useDispatch } from 'react-redux';
import { dataCartProduct } from '../store/cart/cartSlice.types';
import { addFavoritesProduct } from '../store/favorites/favoritesSlice';
import useRootDispatch from './useRootDispatch';

const addToFavorites = (product: dataCartProduct) => {
  const dispatch = useDispatch();
  dispatch(addFavoritesProduct(product));
};

export default addToFavorites;
