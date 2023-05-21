import HeadComponent from '../Head/HeadComponent';
import ProductPreview from '../ProductPreview/ProductPreview';
import style from './searchProduct.module.scss';
import { searchProductResult } from '../../pages/api/search/[search]';
import SearchComponent from '../Search/Search';

type SearchProps = {
  searchProducts: searchProductResult | [];
};

const SearchPage = ({ searchProducts }: SearchProps) => {
  return (
    <div className={style.container}>
      <HeadComponent
        description="Презентация сайта магазина одежды. Главная страница с товаром"
        viewport="width=device-width, initial-scale=1"
      />
      <h2>Поиск товара</h2>
      <div className={style.searchInput}>
        <SearchComponent calb={() => null} />
      </div>
      <div className={style.searchProduct}>
        {searchProducts.map((itemProduct) => {
          return <ProductPreview product={itemProduct.product} key={itemProduct.product.id} />;
        })}{' '}
      </div>
    </div>
  );
};

export default SearchPage;
