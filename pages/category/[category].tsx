import Image, { StaticImageData } from "next/image";
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
import style from "./category.module.scss";
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { productsInCategory } from "../../moc/moc";
import { useRouter } from "next/router";
import Link from "next/link";

export type pathTypes = { params: { category: string }, }[]
export type productComponentTypes = { products: productsInCategory }
export type categoryType = {
  name: string;
  id: string;
}

const Category = ({ products }: productComponentTypes) => {
  const router = useRouter()
  const { category } = router.query

  return <div className={style.container}>
    <div className={style.content}>
      <div className={style.contentNavigate}>
        <Link href={`/categories`}>Категории/</Link>
        <Link href={`${category}`}>{category}</Link>
      </div>
      <div className={style.contentProducts}>
        {products.data.map((product) => <ProductPreview key={product.id} {...{ product }} />)}
      </div>
    </div>

  </div>
};



export async function getStaticPaths() {
  const response = await fetch(`${process.env.API_URL}/api/categories`);
  const categories = await response.json();

  const paths: pathTypes = categories.map((category: categoryType) => {
    return {
      params: { category: category.id },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: {
  params: { category: string },
}) {

  const getProducts = await fetch(
    `${process.env.API_URL}/api/category/${params.category}`
  );
  const products = await getProducts.json();


  return {
    props: { products },
  };
}

export default Category;