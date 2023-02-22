import { Inter } from '@next/font/google'
import style from './../styles/Home.module.scss'
import HeadComponent from '../components/Head/HeadComponent'
import SwiperComponent from '../components/SwiperComponent/SwiperComponent'
import Link from 'next/link'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import ProductPreview from '../components/ProductPreview/ProductPreview'
import { dataCartProduct } from '../store/cart/cartSlice.types'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ products }: { products: dataCartProduct[] }) {

  return (
    <>
      <HeadComponent description='Презентация сайта магазина одежды. Главная страница с товаром'
        viewport='width=device-width, initial-scale=1'
      />

      <div className={style.wrapperContainer}>
        <div className={style.carousel}>
          <SwiperComponent />
        </div>
        <div className={style.wrapperContent}>
          <div className={style.wrapperContentPromotion}>
            <Link href='/'>Акции</Link>
            <Link href='/'>Популярные</Link>
          </div>
          <div className={style.wrapperContentProducts}>
            {products.map((product, index) => <ProductPreview key={index} {...{ product }} />)}
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
    </>
  )
}


export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_URL}/api/products`)

  const products = await response.json()


  return {
    props: { products },
  }
}
