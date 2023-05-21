import HeadComponent from '../components/Head/HeadComponent';
import ProductPreview from '../components/ProductPreview/ProductPreview';
import useAppSelector from '../hooks/useAppSelector';
import { productsInCategory } from '../moc/moc';
import { rootDataFavorites } from '../store/favorites/favoritesSlice';
import style from './../styles/favorites.module.scss';

const Favorites = ({ productsPreview }: { productsPreview: productsInCategory }) => {
  const favoriteProducts = useAppSelector(rootDataFavorites);

  return (
    <div className={style.container}>
      <HeadComponent
        description="Презентация сайта магазина одежды. Главная страница с товаром"
        viewport="width=device-width, initial-scale=1"
      />
      <h2>Избранное</h2>
      <div className={style.favoritesProduct}>
        {favoriteProducts.length ? (
          favoriteProducts.map((product) => <ProductPreview product={product} key={product.id} />)
        ) : (
          <span>Список избранных пуст</span>
        )}
      </div>
      <div className={style.proposalProductsContainer}>
        <p>Рекомендации</p>
        <div className={style.proposalProducts}>
          {productsPreview?.data.map((product) => (
            <ProductPreview key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;

export const getStaticProps = async () => {
  const getProducts = await fetch(`${process.env.API_URL}/api/category/category1`);
  const productsPreview: productsInCategory = await getProducts.json();

  return {
    props: {
      productsPreview,
    },
    revalidate: 86400,
  };
};
