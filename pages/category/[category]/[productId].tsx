import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { productsInCategory } from "../../../moc/moc";
import { categoryType } from "../[category]";

type productPathType = {
    params: {
        category: string,
        productId: string,
    },
}

const Product = () => {

    return <>test</>
}


/* export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`${process.env.API_URL}/api/categories`);
    const categories: { name: string, id: string }[] = await response.json();

    const paths = [] as productPathType[];

    categories.forEach(async (category: categoryType) => {


        const getProducts = await fetch(
            `${process.env.API_URL}/api/category/${category.name}`
        );
        const products: productsInCategory = await getProducts.json();

        products.data.forEach((product) => {
            paths.push({
                params: {
                    category: category.name,
                    productId: product.id,
                },
            });
        });
    });
    console.log('==========path=============');
    console.log(paths);
    console.log('==================path================');
    return {
        paths,
        fallback: false,
    };
}; */
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`${process.env.API_URL}/api/categories`);
    const categories: { name: string, id: string }[] = await response.json();

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

    console.log('==========path=============');
    console.log(paths);
    console.log('==================path================');
    return {
        paths,
        fallback: false,
    };
};

type paramsType = { category: string, productId: string }

export const getStaticProps = async ({ params }: { params: paramsType }) => {
    const { category, productId } = params;

    const getProduct = await fetch
        (`${process.env.API_URL}/api/product/category?category=${category}&idProduct=${productId}`)
    const product: productsInCategory = await getProduct.json();
    console.log('===============static================');
    console.log(product);
    console.log('====================================');
    return {
        props: {
            product,
        },
    };
};

export default Product