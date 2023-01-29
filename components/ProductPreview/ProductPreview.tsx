import Image, { StaticImageData } from 'next/image'
import style from './ProductPreview.module.scss'
import tovar from '../../public/large_tovar.png'
import { BsCart } from "react-icons/bs";
import { mocTypes } from '../../moc/moc';
import Link from 'next/link';




const ProductPreview = ({ product }: { product: mocTypes }) => {

    return <div className={style.container}><Link
        href={`/product/${product.id}`}>
        <div className={style.image}>
            <Image src={product.images[0]} alt='large_tovar' width={164} height={164} />
        </div>
        <div className={style.description}>{product.description}</div>
        <div className={style.count}>
            <div className={style.price}>{product.price}<span>{product.currency}</span></div>
            <div className={style.cart}><BsCart /></div>
        </div>
        </Link>
    </div>
}

export default ProductPreview