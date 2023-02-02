import style from './Wrapper.module.scss'
import SwiperComponent from '../SwiperComponent/SwiperComponent'
import Link from 'next/link'
import ProductPreview from '../ProductPreview/ProductPreview'
import { BsFillInfoCircleFill } from "react-icons/bs";
import { mocProducts } from '../../moc/moc'



const Wrapper = () => {

    return <div className={style.wrapperContainer}>
        <div className={style.carousel}>
            <SwiperComponent />
        </div>
        <div className={style.wrapperContent}>
            <div className={style.wrapperContentPromotion}>
                <Link href='/'>Акции</Link>
                <Link href='/'>Популярные</Link>
            </div>
            <div className={style.wrapperContentProducts}>
                {mocProducts.map((product, index) => <ProductPreview key={index} {...{product}} />)}
            </div>
            <div className={style.wrapperInfo}>
                <div className={style.wrapperInfoSvg}>
                    <BsFillInfoCircleFill />
                </div>
                <div className={style.wrapperInfoText}>
                    <h4> О магазине Mono</h4>
                    <span> Тут вы можете добавить небольшое описание о вашем интернет-магазине. Какие у вас есть плюсы и можете добавить интересные факты о магазине</span>
                    <Link href='/'>Подробнее</Link>
                </div>
            </div>
        </div>
    </div >
}

export default Wrapper