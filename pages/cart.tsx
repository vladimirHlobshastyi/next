import ProductPreview from '../components/ProductPreview/ProductPreview';
import style from './../styles/cart.module.scss';
import { AiOutlineCheck } from 'react-icons/ai';
import CartProduct from '../components/CartProduct/CartProduct';
import { cartState } from '../store/cart/cartSlice';
import useAppSelector from '../hooks/useAppSelector';
import HeadComponent from '../components/Head/HeadComponent';
import { productsInCategory } from '../mock/mock';

const Cart = ({ productsPreview }: { productsPreview: productsInCategory }) => {
  const { products, totalCount, totalPrice } = useAppSelector(cartState);

  return (
    <div className={style.container}>
      <HeadComponent
        description="Презентация сайта магазина одежды. Корзина с товарами"
        viewport="width=device-width, initial-scale=1"
      />
      <h4>Корзина</h4>
      <div className={style.orderContainer}>
        <div className={style.orderProductsContainer}>
          {products.length ? (
            products.map((product) => <CartProduct product={product.data} key={product.data.id} />)
          ) : (
            <span>Корзина пуста</span>
          )}
        </div>
        <div className={style.orderInfo}>
          <div className={style.orderInfoPromo}>
            <span>Введите промокод</span>
            <div className={style.orderInfoPromoInput}>
              <input></input>
              <div className={style.orderInfoPromoInputSvg}>
                {' '}
                <AiOutlineCheck />{' '}
              </div>
            </div>
          </div>
          <div className={style.orderControl}>
            <div className={style.orderControlProducts}>
              <span>Товары ({totalCount})</span>
              <span>{totalPrice} $</span>{' '}
            </div>
            <div className={style.orderControlPrice}>
              <span>Итого к оплате:</span>
              <p>{totalPrice} $</p>
            </div>
            <div className={style.orderControlButton}>Оформить заказ</div>
          </div>
        </div>
      </div>
      <div className={style.proposalProducts}>
        {productsPreview.data.map((product, index) => {
          if (
            product === productsPreview.data[productsPreview.data.length - 1] &&
            index % 2 === 1
          ) {
            return (
              <>
                <ProductPreview key={index} product={product} />
                <div className={style.proposalProductsLp}></div>
              </>
            );
          }
          return <ProductPreview key={index} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Cart;

export const getStaticProps = async () => {
  const getProducts = await fetch(`${process.env.API_URL}/api/category/category1`);
  const productsPreview: productsInCategory = await getProducts.json();

  return {
    props: {
      productsPreview,
    },
    revalidate: 86400,
  };
};
