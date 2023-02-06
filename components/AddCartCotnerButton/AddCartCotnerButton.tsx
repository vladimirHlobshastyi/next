import useAppSelector from '../../hooks/useAppSelector'
import useIsProductInCart from '../../hooks/useIsProductInCart'
import { dataCartProduct } from '../../store/cart/cartSlice.types'
import style from './AddCartCotnerButton.module.scss'


const AddCartCotnerButton = ({ product }: { product: dataCartProduct }) => {
    const products = useAppSelector((state) => state.cart.products)
    const countItemInCart = useIsProductInCart(products, product)
    return <div className={style.container}>
        {countItemInCart ? countItemInCart : <span>В корзину</span>}
    </div>
}

export default AddCartCotnerButton