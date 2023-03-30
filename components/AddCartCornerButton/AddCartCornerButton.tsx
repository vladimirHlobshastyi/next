import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import useAppSelector from '../../hooks/useAppSelector'
import useIsProductInCart from '../../hooks/useIsProductInCart'
import useRootDispatch from '../../hooks/useRootDispatch'
import { addProduct, minusProduct, rootProductsInCart } from '../../store/cart/cartSlice'
import { dataCartProduct } from '../../store/cart/cartSlice.types'
import style from './AddCartCornerButton.module.scss'
import { OrderCartButtonType, OrderCheckButtonType } from './AddCartCornerButton.types'
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useRouter } from 'next/router'
import useIsFavorites from '../../hooks/useIsFavorites'
import { addFavoritesProduct, removeFavoritesProduct, rootFavoritesProducts } from '../../store/favorites/favoritesSlice'


const OrderCheckButton = ({ productCount, dispatch, product }: OrderCheckButtonType) => {
    const router = useRouter()
    return <div className={style.orderNumber}>
        <div className={style.orderNumberMinus}
            onClick={() => dispatch(minusProduct(product))}><AiOutlineMinus /></div>
        <div className={style.orderNumberCall} onClick={() => router.push('/cart')}>
            <span>В корзине {productCount} шт</span> <span>перейти</span></div>
        <div className={style.orderNumberPlus}
            onClick={() => dispatch(addProduct(product))}><AiOutlinePlus /></div>
    </div>

}

const OrderCartButton = ({ dispatch, product }: OrderCartButtonType) => {
    return <div className={style.cartButton} onClick={() => dispatch(addProduct(product))} ><span >В корзину</span></div>
}

const AddCartCornerButton = ({ product }: { product: dataCartProduct }) => {
    const products = useAppSelector(rootProductsInCart)
    const favoritesProducts = useAppSelector(rootFavoritesProducts)

    const countItemInCart = useIsProductInCart(products, product)
    const dispatch = useRootDispatch()
    const isFavorites = useIsFavorites(favoritesProducts, product)
    const changeIsLakes = () => isFavorites ? dispatch(removeFavoritesProduct(product)) : dispatch(addFavoritesProduct(product))


    return <div className={style.container}>
        {countItemInCart ? <OrderCheckButton productCount={countItemInCart}
            dispatch={dispatch}
            product={product} /> :
            <OrderCartButton
                dispatch={dispatch}
                product={product} />}
        <div className={style.likes} onClick={changeIsLakes}>{isFavorites ? <BsHeartFill /> : <BsHeart />}</div>
    </div>
}

export default AddCartCornerButton