import { useRouter } from 'next/router';
import NavbarInUserComponent from '../../components/NavbarInUserComponent/NavbarInUserComponent';
import useIsAuth from '../../hooks/useIsAuth';
import style from './user_contacts.module.scss';

const Bonuses = () => {
  const router = useRouter();
  const { isAuth } = useIsAuth();
  if (!isAuth) {
    router.push('/login');
    return <div className={style.container}></div>;
  }
  return (
    <div className={style.container}>
      <div className={style.navigate}>
        <NavbarInUserComponent />
      </div>
      <div className={style.formContainer}>Скидки и Бонусы</div>
    </div>
  );
};

export default Bonuses;
