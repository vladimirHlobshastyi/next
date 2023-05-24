import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { BiBarChart, BiBarChartAlt } from 'react-icons/bi';
import AddCartCornerButton from '../../../components/AddCartCornerButton/AddCartCornerButton';
import Dropdown from '../../../components/Dropdown/Dropdown';
import HeadComponent from '../../../components/Head/HeadComponent';
import useAppSelector from '../../../hooks/useAppSelector';
import useIsFavorites from '../../../hooks/useIsFavorites';
import useRootDispatch from '../../../hooks/useRootDispatch';
import { productsInCategory, produtsDataType } from '../../../mock/mock';
import { dataCartProduct } from '../../../store/cart/cartSlice.types';
import {
  addCompareProduct,
  compareState,
  removeCompareProduct,
} from '../../../store/compare/compareSlice';
import style from './Product.module.scss';

export type productPathType = {
  params: {
    category: string;
    productId: string;
  };
};

export type paramsType = { category: string; productId: string };

const ProductComponent = ({ product }: { product: produtsDataType }) => {
  const transcriptionMoc = {
    nameWrapper: 'Описание',
    dropDownItem: 'Здесь будет описание вашего товара',
  };
  const transcriptionTwoMoc = {
    nameWrapper: 'Характеристики',
    dropDownItem: 'Здесь будут характиристики вашего товара',
  };
  const [indexImage, setIndexImage] = useState(0);

  const dispatch = useRootDispatch();
  const compareProducts = useAppSelector(compareState);
  const router = useRouter();

  const { category, productId } = router.query;

  const addToCompare = () => {
    if (compareProducts.count < 5) dispatch(addCompareProduct(product));
  };
  const removeFromeCompare = () => {
    dispatch(removeCompareProduct(product));
  };

  return (
    <div>
      <HeadComponent
        description="Презентация сайта магазина одежды. Главная страница с товаром"
        viewport="width=device-width, initial-scale=1"
      />
      <div className={style.container}>
        <div className={style.contentNavigate}>
          <div className={style.contentNavigateWrapper}>
            <Link href={`/categories`}>Категории / </Link>
            <Link href={`/category/${category}`}>{category} / </Link>
            <Link href={`/category/${category}/${productId}`}> {productId}</Link>
          </div>
        </div>
        <div className={style.wrapper}>
          <div className={style.wrapperProduct}>
            <div className={style.wrapperProductImage}>
              <div className={style.wrapperProductImageLogo}>
                <Image
                  src={product.images[indexImage]}
                  alt="logo product"
                  data-cy-logo-image={indexImage}
                />
                <div
                  className={style.compare}
                  onClick={
                    useIsFavorites(compareProducts, product) ? removeFromeCompare : addToCompare
                  }
                >
                  {useIsFavorites(compareProducts, product) ? <BiBarChartAlt /> : <BiBarChart />}
                </div>
              </div>
              <div className={style.wrapperProductImagesMin}>
                {product.images.map((smallImage, index: number) => (
                  <Image
                    src={smallImage}
                    data-cy-image={index}
                    alt="logo product"
                    key={index}
                    onClick={() => {
                      setIndexImage(index);
                    }}
                  />
                ))}
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
                <Dropdown infoForProduct={transcriptionMoc} />
              </div>
              <div className={style.wrapperProductInfoParametres}>
                <Dropdown infoForProduct={transcriptionTwoMoc} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.API_URL}/api/categories`);
  const categories: { name: string; id: string }[] = await response.json();

  const paths = [] as productPathType[];

  for (const category of categories) {
    const getProducts = await fetch(`${process.env.API_URL}/api/category/${category.name}`);
    const products: productsInCategory = await getProducts.json();

    products.data.forEach((product) => {
      paths.push({
        params: {
          category: category.name,
          productId: product.id,
        },
      });
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: paramsType }) => {
  const { category, productId } = params;

  const getProduct = await fetch(
    `${process.env.API_URL}/api/product/category?category=${category}&idProduct=${productId}`
  );
  const product: productsInCategory = await getProduct.json();

  return {
    props: {
      product,
      revalidate: 86400,
    },
  };
};
