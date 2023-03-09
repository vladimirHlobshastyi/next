import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { productsInCategory } from "../../../moc/moc";
import { categoryType } from "../[category]";

type productPathType = {
    params: {
        categoryName: string,
        productId: string,
    },
}

const Product = () => {

    return <>test</>
}


export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`${process.env.API_URL}/api/categories`);
    const categories = await response.json();

    const paths = [] as productPathType[];

    categories.forEach(async (category: categoryType) => {

        /*   const response = await fetch(`${process.env.API_URL}/api/product/category?category=${category.name}&idProduct=${}`);
          const categories = await response.json();
          */

        const getProducts = await fetch(
            `${process.env.API_URL}/api/category/${category.name}`
        );
        const products: productsInCategory = await getProducts.json();

        products.data.forEach((product) => {
            paths.push({
                params: {
                    categoryName: category.name,
                    productId: product.id,
                },
            });
        });
    });

    return {
        paths,
        fallback: false,
    };
};

type paramsType = { categoryName: string, productId: string }

export const getStaticProps = async ({ params }: { params: paramsType }) => {
    const { categoryName, productId } = params;

    const getProduct = await fetch
        (`${process.env.API_URL}/api/product/category?category=${categoryName}&idProduct=${productId}`)
    const product: productsInCategory = await getProduct.json();

    return {
        props: {
            product,
        },
    };
};



























/* 
type Props = {
    category: string;
    productName: string;
}

export const getStaticPaths = async () => {

     const response = await fetch(`${process.env.API_URL}/api/categories`);
     const categories = await response.json();
 
    const response = await fetch(`${process.env.API_URL}/api/categories`);
    const categories = await response.json();

    const paths: { params: { category: string } }[] = categories.map((category: any) => {
        return {
            params: { category: category.id },
        };
    });

    return {
        paths,
        fallback: false,
    };
}
export async function getStaticProps(params: { category: string, productName: string }) {
    const { category, productName } = params;
    //const product = allProducts[category].find((p) => p.name === productName);

    const getProducts = await fetch(
        `${process.env.API_URL}/api/categories/${category}`
    );
    const products = await getProducts.json();


    return {
        props: { products },
    };
} */
/* export async function getStaticPaths({ params }: any) {
    const { category } = params;

    const getProducts = await fetch(
        `${process.env.API_URL}/api/categories/${params.category}`
    );
    const products = await getProducts.json();

    const paths = products.data.map((product: any) => ({
        params: { category, productName: product.id },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const { category, productName } = params;

    const getProducts = await fetch(
        `${process.env.API_URL}/api/categories/${params.category}`
    );
    const products = await getProducts.json();
    const result = products.data.filter((item: any) => { item.id == productName })
    return {
        props: {
            product: result,
        },
    };
} */
export default Product