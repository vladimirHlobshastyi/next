import useRootDispatch from '../../hooks/useRootDispatch';
import style from './CardButton.module.scss';
import { IoCartOutline } from 'react-icons/io5';
import { addProduct } from '../../store/cart/cartSlice';
import { dataCartProduct } from '../../store/cart/cartSlice.types';
import ControlCountComponent from '../ControlCountComponent/ControlCountComponent';

type CardButtonPropsType = {
  countProductsInCart: number | false;
  product: dataCartProduct;
};

const CardButton = ({ countProductsInCart, product }: CardButtonPropsType) => {
  const dispatch = useRootDispatch();
  return (
    <div className={style.cart} onClick={() => dispatch(addProduct(product))}>
      {countProductsInCart ? (
        <div className={style.cartItem}>
          +1 шт
          <ControlCountComponent countProductsInCart={countProductsInCart} />
        </div>
      ) : (
        <IoCartOutline />
      )}
    </div>
  );
};

export default CardButton;
