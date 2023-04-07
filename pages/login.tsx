import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./../styles/login.module.scss";
import useRootDispatch from "../hooks/useRootDispatch";
import { isAuthState, loginThunk } from "../store/auth/authSlice";
import useAppSelector from "../hooks/useAppSelector";
import { useRouter } from "next/router";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()
    const isAuth = useAppSelector(isAuthState)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ login: string; password: string }>();

    const dispatch = useRootDispatch();

    const onSubmit = (data: { login: string; password: string }) => {
        dispatch(loginThunk(data));
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => { if (isAuth) { router.push('/user/history_of_orders') } }, [isAuth])

    return (
        <div className={style.container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="login">Login:</label>
                    <input type="text" id="login" {...register("login", { required: true })} />
                    {errors.login && <span>This field is required</span>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        {...register("password", { required: true })}
                    />
                    <button type="button" onClick={toggleShowPassword}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && <span>This field is required</span>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
