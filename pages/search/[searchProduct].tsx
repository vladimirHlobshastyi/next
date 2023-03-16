import { GetServerSideProps, GetServerSidePropsContext } from "next";
import getSerchedProducts from "../../api/getSerchedProducts";
import { searchProductResult } from "../api/search/[search]";
import SearchPage from "../../components/SearchPage/[searchProduct]";



type SearchProps = {
    searchProducts: searchProductResult;
}

const Search = ({ searchProducts }: SearchProps) => <SearchPage searchProducts={searchProducts} />


export const getServerSideProps: GetServerSideProps<SearchProps> = async (context) => {
    const searchProduct = context.query.searchProduct as string;
    const fetchData = await getSerchedProducts(searchProduct);
    return { props: { searchProducts: fetchData } };
};

export default Search