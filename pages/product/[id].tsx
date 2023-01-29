import Router from "next/router";
import HeadComponent from "../../components/Head/HeadComponent";
import Product from "../../components/Product/Product";
import { mocProducts, mocTypes } from "../../moc/moc";
import style from "../../styles/Home.module.scss";

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  const paths: {
    params: { id: string },
  }[] = products.map((product: mocTypes) => {
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
    `http://localhost:3000/api/products/${params.id}`
  );
  const allProductsResponse = await fetch(
    `http://localhost:3000/api/products`
  );
  const allProducts = await allProductsResponse.json();
  const product = await response.json();

  return {
    props: { product, allProducts },
  };
}

const products = mocProducts;
const ProductComponent = ({ product, allProducts }: { product: mocTypes, allProducts: mocTypes[] }) => {

  return (
    <div className={style.container}>
      <HeadComponent
        description="test project, main link"
        viewport="width=device-width, initial-scale=1"
      />
      <Product {...{ product, allProducts }} />
    </div>
  );
};

export default ProductComponent;
