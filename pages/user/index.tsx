import { useRouter } from "next/router"
import style from './user.module.scss'
import useIsAuth from "../../hooks/useIsAuth"
import useRootDispatch from "../../hooks/useRootDispatch"
import { logout } from "../../store/auth/authSlice"


const User = () => {
    const { isAuth } = useIsAuth()
    const router = useRouter()
    const dispatch = useRootDispatch()

    const logoutFunc = () => dispatch(logout())
    const pushToContacts = () => router.push('/user/user_contacts')
    if (!isAuth) {
        router.push('/login')
        return <div className={style.container}></div>
    }

    return <div className={style.container}>
        <div className={style.navigate}>
            <div className={style.navigateEl}>История заказов</div>
            <div className={style.navigateEl}>Адрес доставки</div>
            <div className={style.navigateEl}>Скидки и бонусы</div>
            <div className={style.navigateEl} onClick={pushToContacts}>Контактные данные</div>
            <div className={style.navigateEl} onClick={logoutFunc}>Выход</div>
        </div>
        <div className={style.wrapper}>
            <h2>История заказаов</h2>
        </div>
    </div>

}

export default User