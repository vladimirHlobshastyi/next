import Image from 'next/image'
import useAppSelector from '../hooks/useAppSelector'
import { dataCartProduct } from '../store/cart/cartSlice.types'
import style from './../styles/compare.module.scss'
import { BsHeart, BsHeartFill } from "react-icons/bs";
import useIsFavorites from '../hooks/useIsFavorites'
import useRootDispatch from '../hooks/useRootDispatch'
import { addFavoritesProduct, removeFavoritesProduct, rootFavoritesProducts } from '../store/favorites/favoritesSlice'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { compareState, removeCompareProduct } from '../store/compare/compareSlice'
import { AiOutlineStar } from 'react-icons/ai'
import HeadComponent from '../components/Head/HeadComponent';
import Router from 'next/router';


const CompareProduct = ({ product }: { product: dataCartProduct }) => {
    const router = Router
    const dispatch = useRootDispatch()
    const favoritesProducts = useAppSelector(rootFavoritesProducts)

    const addToFavorites = () => {
        dispatch(addFavoritesProduct(product))
    }
    const removeFromeFavorites = () => {
        dispatch(removeFavoritesProduct(product))
    }
    const removeFromeCompare = () => {
        dispatch(removeCompareProduct(product))
    }


    return <div className={style.containerCompare} >
        <div className={style.logoImage} onClick={() => router.push(`/category/category1/${product.id}`)}><Image src={product.images[0]} alt='imageLogo' /></div>
        <div className={style.stars}>
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
        </div>
        <div className={style.article}><span>Артикул</span><span>{product.article}</span></div>
        <div className={style.description}><span>{product.description}</span></div>
        <div className={style.price}><span>{product.price}</span><span>{product.currency}</span></div>
        <div className={style.buttons}>
            <div className={style.likes} onClick={useIsFavorites(favoritesProducts, product) ? removeFromeFavorites : addToFavorites}>
                {useIsFavorites(favoritesProducts, product) ? <BsHeartFill /> : <BsHeart />}
            </div>
            <div className={style.remove} onClick={removeFromeCompare}>
                <RiDeleteBin6Line />
            </div>
        </div>
    </div >
}
const Compare = () => {
    const compare = useAppSelector(compareState)
    return <div className={style.container}>
        <HeadComponent
            description='Презентация сайта магазина одежды. Сравнение товаров'
            viewport='width=device-width, initial-scale=1'
        />
        {compare.count ? compare.data.map((product) => <CompareProduct product={product} key={product.id} />) : <span>Список сравнения пуст</span>}

    </div>
}

export default Compare