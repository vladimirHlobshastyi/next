import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HeadComponent from '../components/Head/HeadComponent';
import style from '../styles/Home.module.scss';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push('/'), 2000);
  }, []);

  return (
    <div className={style.notFoundContainer}>
      <HeadComponent
        description="Презентация сайта магазина одежды. Главная страница с товаром"
        viewport="width=device-width, initial-scale=1"
      />
      <span>404</span>
    </div>
  );
};

export default NotFoundPage;
