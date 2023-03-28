import { Inter } from '@next/font/google'
import style from './../styles/Home.module.scss'
import HeadComponent from '../components/Head/HeadComponent'
import SwiperComponent from '../components/SwiperComponent/SwiperComponent'
import Link from 'next/link'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import ProductPreview from '../components/ProductPreview/ProductPreview'
import { productsInCategory } from '../moc/moc'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ products }: { products: productsInCategory }) {

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
            <Link href='/'>Новинки</Link>
          </div>
          <div className={style.wrapperContentProducts}>
            {products.data.map((product, index) => {
              if (product === products.data[products.data.length - 1] && index % 2 === 1) {
                return <><ProductPreview key={product.id} product={product} /><div className={style.proposalProductsLp}></div></>
              }
              return <ProductPreview key={product.id} product={product} />
            }

            )}
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


export const getStaticProps = async () => {
  try {
    const getProducts = await fetch(`${process.env.API_URL}/api/category/category1`);
    if (!getProducts.ok) {
      throw new Error(`Failed to fetch products from API, status code: ${getProducts.status}`);
    }
    const products: productsInCategory = await getProducts.json();

    return {
      props: {
        products,
      },
      revalidate: 86400,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: {
          data: [],
        },
      },
      revalidate: 500,
    };
  }
};








