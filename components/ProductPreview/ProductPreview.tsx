import Image, { StaticImageData } from 'next/image'
import style from './ProductPreview.module.scss'
import { BsCart } from "react-icons/bs";
import useRootDispatch from '../../hooks/useDispatch';
import { addProduct } from '../../store/cart/cartSlice';
import Router from 'next/router';
import { dataCartProduct } from '../../store/cart/cartSlice.types';



const ProductPreview = ({ product }: { product: dataCartProduct }) => {
    const dispatch = useRootDispatch()
    const route = Router
    return <div className={style.container} >
        <div onClick={() => route.push(`/product/${product.id}`)} >
            <div className={style.image}>
                <Image src={product.images[0]} alt='large_tovar' width={164} height={164} />
            </div>
            <div className={style.description}>{product.description}</div>
        </div>
        <div className={style.count}>
            <div className={style.price}>{product.price}<span>{product.currency}</span></div>
            <div className={style.cart} onClick={() => dispatch(addProduct(product))}><BsCart /></div>
        </div>

    </div>
}

export default ProductPreview