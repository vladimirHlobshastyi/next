import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import getSerchedProducts from "../../api/getSerchedProducts";
import HeadComponent from "../../components/Head/HeadComponent";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import { searchProductResult } from "../api/search/[search]";
import style from './searchPrudct.module.scss'
import SearchComponent from "../../components/Search/Search";



type SearchProps = {
    searchProducts: searchProductResult;
}

const Search = ({ searchProducts }: SearchProps) => {

    const router = useRouter();
    const { searchProduct } = router.query;


    return <div className={style.container}>
        <HeadComponent
            description='Презентация сайта магазина одежды. Главная страница с товаром'
            viewport='width=device-width, initial-scale=1'
        />
        <h2>Поиск</h2>
        <div className={style.searchInput}><SearchComponent calb={() => 1} /></div>
        <div className={style.searchProduct}>
            {searchProducts.map((itemProduct) => {
                return <ProductPreview product={itemProduct.product} key={itemProduct.product.id} />
            })}    </div>

    </div >

}




export const getServerSideProps: GetServerSideProps<SearchProps> = async (context) => {
    const searchProduct = context.query.searchProduct as string;
    const fetchData = await getSerchedProducts(searchProduct);
    return { props: { searchProducts: fetchData } };
};

export default Search