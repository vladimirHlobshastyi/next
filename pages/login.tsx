import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import style from './../styles/login.module.scss';
import useRootDispatch from '../hooks/useRootDispatch';
import { errorAuthState, isAuthState, loginThunk } from '../store/auth/authSlice';
import useAppSelector from '../hooks/useAppSelector';
import { useRouter } from 'next/router';

const FAILED_TO_LOGIN = 'Failed to login';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const dispatch = useRootDispatch();

  const isAuth = useAppSelector(isAuthState);
  const errorAuth = useAppSelector(errorAuthState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ login: string; password: string }>();

  const isLoginFailed = errorAuth.message === FAILED_TO_LOGIN;

  const onSubmit = useCallback(
    (data: { login: string; password: string }) => {
      dispatch(loginThunk(data));
      reset();
    },
    [dispatch]
  );

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuth) {
      router.push('/user/history_of_orders');
    }
  }, [isAuth, router]);

  return (
    <div className={style.container}>
      <h1>Вход в личный кабинет</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="login">Логин:</label>
          <input
            type="text"
            placeholder="логин &rarr; user"
            id="login"
            {...register('login', { required: true })}
          />
          {errors.login && <span>Введите логин</span>}
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="пароль &rarr; password"
            {...register('password', { required: true })}
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? 'показать' : 'скрыть'}
          </button>
          {errors.password && <span>Введите пароль</span>}
        </div>
        <div className={style.error}>
          {errorAuth.isError &&
            (isLoginFailed ? (
              <span>Не верный логин или пароль</span>
            ) : (
              <span>Логинизация не удалась... пожалуйста попробуйте позже</span>
            ))}
        </div>
        <button type="submit">Принять</button>
      </form>
    </div>
  );
};

export default Login;
