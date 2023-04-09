import Image from 'next/image'
import style from './CartProduct.module.scss'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useRootDispatch from '../../hooks/useRootDispatch';
import { addProduct, cartState, minusProduct, removeProduct, rootProductsInCart } from '../../store/cart/cartSlice';
import { dataCartProduct } from '../../store/cart/cartSlice.types';
import { useRouter } from 'next/router';
import useAppSelector from '../../hooks/useAppSelector';
import { useMemo } from 'react';




const CartProduct = ({ product }: { product: dataCartProduct }) => {
    const products = useAppSelector(rootProductsInCart);
    const dispatch = useRootDispatch()
    const router = useRouter()


    const countProduct = () => {
        const isProductInCart = products.find((productItem) => productItem.data.id === product.id);
        if (isProductInCart?.count) {
            return isProductInCart.count;
        }
        return 0;
    };
    const minusProductItem = () => dispatch(minusProduct(product))

    const addProductItem = () => dispatch(addProduct(product))

    const removeProductItem = () => dispatch(removeProduct({ ...product, quantity: countProduct() }))

    const totalPriceOrder = () => product.price * countProduct()

    return <div className={style.orderProduct}>
        <div className={style.orderProductImage}>
            <Image src={product.images[0]} alt='logot' width={150} height={150} />
        </div>
        <div className={style.orderDescription} onClick={() => router.push(`/product/${product.id}`)}>
            {product.description}
            <span>{product.price}{product.currency}/<span>шт</span></span>
        </div>
        <div className={style.orderNumber}>
            <div className={style.orderNumberMinus}
                onClick={minusProductItem}><AiOutlineMinus /></div>
            <div className={style.orderNumberCall}>{countProduct ? countProduct() : null}</div>
            <div className={style.orderNumberPlus}
                onClick={addProductItem}><AiOutlinePlus /></div>
        </div>
        <div className={style.orderPrice}>
            <span>{totalPriceOrder()} {product.currency}</span>
        </div>
        <div className={style.orderAddToCart} onClick={removeProductItem}>
            <RiDeleteBin6Line />
        </div>
    </div >
}

export default CartProduct