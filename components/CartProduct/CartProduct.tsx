import Image from 'next/image'
import style from './CartProduct.module.scss'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useRootDispatch from '../../hooks/useRootDispatch';
import { addProduct, cartState, minusProduct, removeProduct } from '../../store/cart/cartSlice';
import { dataCartProduct } from '../../store/cart/cartSlice.types';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';




const CartProduct = ({ product }: { product: dataCartProduct }) => {
    const { products } = useSelector(cartState);
    const dispatch = useRootDispatch()
    const router = useRouter()

    const countProduct = () => {
        const allParametresProduct = products.find((item) => item.data.id === product.id)
        if (allParametresProduct?.count) {
            return allParametresProduct?.count
        } else {
            return 0
        }
    }

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
                onClick={() => dispatch(minusProduct(product))}><AiOutlineMinus /></div>
            <div className={style.orderNumberCall}>{countProduct ? countProduct() : null}</div>
            <div className={style.orderNumberPlus}
                onClick={() => dispatch(addProduct(product))}><AiOutlinePlus /></div>
        </div>
        <div className={style.orderPrice}>
            <span>{totalPriceOrder()} {product.currency}</span>
        </div>
        <div className={style.orderAddToCart} onClick={() =>
            dispatch(removeProduct({ ...product, quantity: countProduct() }))}>
            <RiDeleteBin6Line />
        </div>
    </div >
}

export default CartProduct