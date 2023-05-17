import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArrowDropup from '../ArrowDropup/ArrowDropup';
import Footer from '../Footer/Footer';
import LoaderComponent from '../LoaderComponent/LoaderComponent';
import NavBar, { CategoryTypes } from '../NavBar/NavBar';
import style from './Layout.module.scss';

type LayoutTypes = { children: JSX.Element | JSX.Element[] };

const Layout = ({ children }: LayoutTypes) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);
  const [categories, setCategories] = useState([] as CategoryTypes);

  const handleScroll = () => {
    setShowButton(window.pageYOffset > 100);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.layouContainer}>
      {loading ? <LoaderComponent /> : null}

      <NavBar categories={categories} />
      <div className={style.layouChildren}>{children}</div>
      {showButton && <ArrowDropup calb={handleClick} />}
      <Footer />
    </div>
  );
};

export default Layout;
