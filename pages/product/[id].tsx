import Image from "next/image";
import { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import Dropdown from "../../components/Dropdown/Dropdown";
import HeadComponent from "../../components/Head/HeadComponent";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import { mocProducts } from "../../moc/moc";
import { dataCartProduct } from "../../store/cart/cartSlice.types";
import style from "./Product.module.scss";

type pathTypes = { params: { id: string }, }[]
type productComponentTypes = { product: dataCartProduct, allProducts: dataCartProduct[] }

/* export async function getStaticPaths() {
  const response = await fetch(`${procces.env.API_URL}/api/products`);
  const products = await response.json();
  const paths: pathTypes = products.map((product: dataCartProduct) => {
    return {
      params: { id: product.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: {
  params: { id: string },
}) {
  const response = await fetch(
    `${procces.env.API_URL}/api/products/${params.id}`
  );
  const allProductsResponse = await fetch(
    `${procces.env.API_URL}/api/products`
  );
  const allProducts = await allProductsResponse.json();
  const product = await response.json();

  return {
    props: { product, allProducts },
  };
}
 */

const ProductComponent = (/* { product, allProducts }: productComponentTypes */) => {
  const transcriptionMoc = { nameWrapper: 'Описание', dropDownItem: ['Здесь будет описание вашего товара'] }
  const transcriptionTwoMoc = { nameWrapper: 'Характеристики', dropDownItem: ['Здесь будут характиристики вашего товара'] }
  const allProducts = mocProducts
  const [indexImage, setIndexImage] = useState(0)
  return (
    <div>
      <HeadComponent
        description="test project, main link"
        viewport="width=device-width, initial-scale=1"
      />
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.wrapperNavigate}> navigation** </div>
          <div className={style.wrapperProduct}>
            <div className={style.wrapperProductImage}>
              <div className={style.wrapperProductImageLogo}>
                <Image src={allProducts[0].images[indexImage]} alt='logo product' />
              </div>
              <div className={style.wrapperProductImagesMin}>
                {allProducts[0].images.map((smallImage, index) =>
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
                арт.{allProducts[0].article}
              </div>
              <div className={style.wrapperProductInfoLabel}>{allProducts[0].description}</div>
              <div className={style.wrapperProductInfoCurrency}>
                <h4>{allProducts[0].price}</h4>
                <span>{allProducts[0].currency}</span>
              </div>
              <div className={style.wrapperProductInfoColor}>Цвет</div>
              <div className={style.wrapperProductInfoCartButton}><span>В корзину</span></div>
              <div className={style.wrapperProductInfoSpan}></div>
              <div className={style.wrapperProductInfoDescription}>
                <Dropdown {...transcriptionMoc} />
              </div>
              <div className={style.wrapperProductInfoParametres}>
                <Dropdown {...transcriptionTwoMoc} />
              </div>
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
    </div>
  );
};

export default ProductComponent;
