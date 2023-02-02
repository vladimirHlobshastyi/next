import Image from 'next/image'
import ProductPreview from '../ProductPreview/ProductPreview'
import style from './Product.module.scss'
import { useState } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import { AiOutlineStar } from 'react-icons/ai';
import { dataCartProduct } from '../../store/cart/cartSlice.types'


const Product = ({ product, allProducts }: { product: dataCartProduct, allProducts: dataCartProduct[] }) => {
    const transcriptionMoc = { nameWrapper: 'Описание', dropDownItem: ['sadasdasdsadas'] }
    const transcriptionTwoMoc = { nameWrapper: 'Характеристики', dropDownItem: ['sadasdasdsadas'] }

    const [indexImage, setIndexImage] = useState(0)

    return <div className={style.container}>
        <div className={style.wrapper}>
            <div className={style.wrapperNavigate}> navigation** </div>
            <div className={style.wrapperProduct}>
                <div className={style.wrapperProductImage}>
                    <div className={style.wrapperProductImageLogo}>
                        <Image src={product.images[indexImage]} alt='logo product' />
                    </div>
                    <div className={style.wrapperProductImagesMin}>
                        {product.images.map((smallImage, index) =>
                            <Image src={smallImage} alt='logo product' key={index} onClick={() => {

                                setIndexImage(index)
                            }} />)}
                    </div>

                </div>
                <div className={style.wrapperProductInfo}>
                    <div className={style.wrapperProductInfoArticle}>
                        <div className={style.wrapperProductInfoArticleStars}>
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar /></div>
                        арт.{product.article}
                    </div>
                    <div className={style.wrapperProductInfoLabel}>{product.description}</div>
                    <div className={style.wrapperProductInfoCurrency}><h4>{product.price}</h4><span>{product.currency}</span></div>
                    <div className={style.wrapperProductInfoColor}>Цвет</div>
                    <div className={style.wrapperProductInfoCartButton}><span>В корзину</span></div>
                    <div className={style.wrapperProductInfoSpan}></div>
                    <div className={style.wrapperProductInfoDescription}><Dropdown {...transcriptionMoc} /></div>
                    <div className={style.wrapperProductInfoParametres}><Dropdown {...transcriptionTwoMoc} /></div>
                </div>
            </div>
            <div className={style.wrapperPromotion}>
                <span> Похожие товары:</span>
                <div className={style.wrapperPromotionContent}>
                    {allProducts.map((product, index) => <ProductPreview key={index} {...{ product }} />)}
                </div>
            </div>
        </div>
    </div>

}

export default Product
