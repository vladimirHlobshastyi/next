import Image from 'next/image'
import style from './ProductPreview.module.scss'
import useRootDispatch from '../../hooks/useRootDispatch';
import Router from 'next/router';
import { dataCartProduct } from '../../store/cart/cartSlice.types';
import useAppSelector from '../../hooks/useAppSelector';
import CardButton from '../CardButton/CardButton';
import useIsProductInCart from '../../hooks/useIsProductInCart';



const ProductPreview = ({ product }: { product: dataCartProduct }) => {
    const route = Router
    const products = useAppSelector((state) => state.cart.products)
   /*  const countProductsInCart = () => {
        const countProductsArray = products.filter((item) => item.data.id === product.id)
        countProductsArray.length ? countProductsArray[0].count : false;
        if (countProductsArray.length) {
            return countProductsArray[0].count
        }
        return false
    } */

    return <div className={style.container} >
        <div onClick={() => route.push(`/product/${product.id}`)} >
            <div className={style.image}>
                <Image src={product.images[0]} alt='large_tovar' width={164} height={164} />
            </div>
            <div className={style.description}>{product.description}</div>
        </div>
        <div className={style.count}>
            <div className={style.price}>{product.price}<span>{product.currency}</span></div>
            <CardButton product={product} countProductsInCart={useIsProductInCart(products, product)} />
        </div>

    </div>
}

export default ProductPreview