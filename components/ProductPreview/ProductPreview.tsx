import Image from 'next/image'
import style from './ProductPreview.module.scss'
import useRootDispatch from '../../hooks/useRootDispatch';
import Router, { useRouter } from 'next/router';
import { dataCartProduct } from '../../store/cart/cartSlice.types';
import useAppSelector from '../../hooks/useAppSelector';
import CardButton from '../CardButton/CardButton';
import useIsProductInCart from '../../hooks/useIsProductInCart';
import { addFavoritesProduct, removeFavoritesProduct, rootFavoritesProducts } from '../../store/favorites/favoritesSlice';
import { BsHeart, BsHeartFill } from "react-icons/bs";
import useIsFavorites from '../../hooks/useIsFavorites';
import { addCompareProduct, compareState, removeCompareProduct } from '../../store/compare/compareSlice';
import { BiBarChart, BiBarChartAlt } from "react-icons/bi";
import { rootProductsInCart } from '../../store/cart/cartSlice';


const ProductPreview = ({ product }: { product: dataCartProduct }) => {
    const router = Router
    const { category } = useRouter().query

    const products = useAppSelector(rootProductsInCart)
    const favoritesProducts = useAppSelector(rootFavoritesProducts)
    const compareProducts = useAppSelector(compareState)
    const dispatch = useRootDispatch()

    const addToFavorites = () => {
        dispatch(addFavoritesProduct(product))
    }
    const removeFromeFavorites = () => {
        dispatch(removeFavoritesProduct(product))
    }
    const addToCompare = () => {
        if (compareProducts.count < 5)
            dispatch(addCompareProduct(product))
    }
    const removeFromeCompare = () => {
        dispatch(removeCompareProduct(product))
    }


    return <div className={style.container} data-cy-product-preview={product.id}>
        <div className={style.favorit}
            onClick={useIsFavorites(favoritesProducts, product) ? removeFromeFavorites : addToFavorites}>
            {useIsFavorites(favoritesProducts, product) ? <BsHeartFill /> : <BsHeart />}
        </div>
        <div className={style.compare}
            onClick={useIsFavorites(compareProducts, product) ? removeFromeCompare : addToCompare}>
            {useIsFavorites(compareProducts, product) ? <BiBarChartAlt /> : <BiBarChart />}
        </div>
        <div onClick={() => router.push(`/category/${category || 'category1'}/${product.id}`)} >
            <div className={style.image} >
                <Image src={product.images[0]} alt='large_tovar' width={164} height={164} />
            </div>
            <div className={style.description} >{product.description}</div>
        </div>
        <div className={style.count}>
            <div className={style.price}>{product.price}<span>{product.currency}</span></div>
            <CardButton product={product} countProductsInCart={useIsProductInCart(products, product)} />
        </div>

    </div>
}

export default ProductPreview