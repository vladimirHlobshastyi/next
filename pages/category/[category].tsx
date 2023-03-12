import ProductPreview from "../../components/ProductPreview/ProductPreview";
import style from "./category.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { categoryType, pathTypes, productComponentTypes } from "./category.types";



const Category = ({ products }: productComponentTypes) => {
  const router = useRouter()
  const { category } = router.query

  return <div className={style.container}>
    <div className={style.content}>
      <div className={style.contentNavigate}>
        <Link href={`/categories`}>Категории / </Link>
        <Link href={`${category}`}> {category}</Link>
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
    props: { products }, revalidate: 86400,
  };
}

export default Category;