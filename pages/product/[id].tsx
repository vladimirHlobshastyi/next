import Image from "next/image";
import { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BiBarChart, BiBarChartAlt } from "react-icons/bi";
import AddCartCornerButton from "../../components/AddCartCornerButton/AddCartCornerButton";
import Dropdown from "../../components/Dropdown/Dropdown";
import HeadComponent from "../../components/Head/HeadComponent";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import useAppSelector from "../../hooks/useAppSelector";
import useIsFavorites from "../../hooks/useIsFavorites";
import useRootDispatch from "../../hooks/useRootDispatch";
import { dataCartProduct } from "../../store/cart/cartSlice.types";
import { addCompareProduct, compareState, removeCompareProduct } from "../../store/compare/compareSlice";
import style from "./Product.module.scss";

type pathTypes = { params: { id: string }, }[]
type productComponentTypes = { product: dataCartProduct, allProducts: dataCartProduct[] }


const ProductComponent = ({ product, allProducts }: productComponentTypes) => {
  const transcriptionMoc = { nameWrapper: 'Описание', dropDownItem: ['Здесь будет описание вашего товара'] }
  const transcriptionTwoMoc = { nameWrapper: 'Характеристики', dropDownItem: ['Здесь будут характиристики вашего товара'] }
  const [indexImage, setIndexImage] = useState(0)

  const dispatch = useRootDispatch()
  const compareProducts = useAppSelector(compareState)


  const addToCompare = () => {
    if (compareProducts.count < 5)
      dispatch(addCompareProduct(product))
  }
  const removeFromeCompare = () => {
    dispatch(removeCompareProduct(product))
  }


  return (
    <div>
      <HeadComponent
        description='Презентация сайта магазина одежды. Главная страница с товаром'
        viewport='width=device-width, initial-scale=1'
      />
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.wrapperNavigate}> navigation** </div>
          <div className={style.wrapperProduct}>
            <div className={style.wrapperProductImage}>
              <div className={style.wrapperProductImageLogo}>
                <Image src={product.images[indexImage]} alt='logo product' />
                <div className={style.compare}
                  onClick={useIsFavorites(compareProducts, product) ? removeFromeCompare : addToCompare}>
                  {useIsFavorites(compareProducts, product) ? <BiBarChartAlt /> : <BiBarChart />}
                </div>
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
                  <AiOutlineStar />
                </div>
                арт.{product.article}
              </div>
              <div className={style.wrapperProductInfoLabel}>{product.description}</div>
              <div className={style.wrapperProductInfoCurrency}>
                <h4>{product.price}</h4>
                <span>{product.currency}</span>
              </div>
              <div className={style.wrapperProductInfoColor}>Цвет</div>
              <AddCartCornerButton product={product} />
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


export async function getStaticPaths() {
  const response = await fetch(`${process.env.API_URL}/api/products`);
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
  const getOneProduct = await fetch(
    `${process.env.API_URL}/api/products/${params.id}`
  );
  const getAllProductsResponse = await fetch(
    `${process.env.API_URL}/api/products`
  );
  const allProducts = await getAllProductsResponse.json();
  const product = await getOneProduct.json();

  return {
    props: { product, allProducts },
  };
}