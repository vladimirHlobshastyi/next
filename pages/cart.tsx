import ProductPreview from '../components/ProductPreview/ProductPreview';
import style from './../styles/cart.module.scss'
import { AiOutlineCheck } from 'react-icons/ai';
import CartProduct from '../components/CartProduct/CartProduct';
import { dataCartProduct } from '../store/cart/cartSlice.types';
import { useSelector } from 'react-redux';
import { cartState } from '../store/cart/cartSlice';


const Cart = ({ productsPreview }: { productsPreview: dataCartProduct[] }) => {
  const { products, totalCount, totalPrice } = useSelector(cartState);
  return <div className={style.container}>
    <h4 >Корзина</h4>

    <div className={style.orderContainer}>
      <div className={style.orderProductsContainer}>
        {products.length ? products.map((product) => <CartProduct product={product.data} key={product.data.id} />) : <span>Корзина пуста</span>}
      </div>
      <div className={style.orderInfo}>
        <div className={style.orderInfoPromo}>
          <span>Введите промокод</span>
          <div className={style.orderInfoPromoInput}>
            <input></input>
            <div className={style.orderInfoPromoInputSvg}> <AiOutlineCheck /> </div>
          </div>
        </div>
        <div className={style.orderControl}>
          <div className={style.orderControlProducts}>
            <span>Товары ({totalCount})</span><span>{totalPrice} $</span> </div>
          <div className={style.orderControlPrice}>
            <span>Итого к оплате:</span>
            <span>{totalPrice} $</span>
          </div>
          <div className={style.orderControlButton}>Оформить заказ</div>
        </div>
      </div>
    </div>
    <div className={style.proposalProducts}>
      {productsPreview.map((product, index) => <ProductPreview key={index} product={product} />)}
    </div>

  </div>;
};

export default Cart

export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_URL}/api/products`)
  const productsPreview = await response.json()

  return {
    props: { productsPreview },
  }
}