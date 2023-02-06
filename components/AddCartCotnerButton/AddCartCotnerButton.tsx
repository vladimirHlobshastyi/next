import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import useAppSelector from '../../hooks/useAppSelector'
import useIsProductInCart from '../../hooks/useIsProductInCart'
import useRootDispatch from '../../hooks/useRootDispatch'
import { addProduct, minusProduct } from '../../store/cart/cartSlice'
import { dataCartProduct } from '../../store/cart/cartSlice.types'
import style from './AddCartCotnerButton.module.scss'
import { OrderCartButton, OrderCheckButton } from './AddCartCotnerButton.types'

const OrderCheckButton = ({ productCount, dispatch, product }: OrderCheckButton) => {
    return <div className={style.orderNumber}>
        <div className={style.orderNumberMinus}
            onClick={() => dispatch(minusProduct(product))}><AiOutlineMinus /></div>
        <div className={style.orderNumberCall}><span>В корзине {productCount} шт</span> <span>перейти</span></div>
        <div className={style.orderNumberPlus}
            onClick={() => dispatch(addProduct(product))}><AiOutlinePlus /></div>
    </div>

}

const OrderCartButton = ({ dispatch, product }: OrderCartButton) => {
    return <div className={style.cartButton} onClick={() => dispatch(addProduct(product))} ><span >В корзину</span></div>
}
const AddCartCotnerButton = ({ product }: { product: dataCartProduct }) => {
    const products = useAppSelector((state) => state.cart.products)
    const dispatch = useRootDispatch()
    const countItemInCart = useIsProductInCart(products, product)

    return <div className={style.container}>
        {countItemInCart ? <OrderCheckButton productCount={countItemInCart}
            dispatch={dispatch}
            product={product} /> :
            <OrderCartButton
                dispatch={dispatch}
                product={product} />}
    </div>
}

export default AddCartCotnerButton