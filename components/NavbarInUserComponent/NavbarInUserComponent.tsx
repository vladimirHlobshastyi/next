import { useRouter } from 'next/router'
import style from './NavbarInUserComponent.module.scss'
import useRootDispatch from '../../hooks/useRootDispatch'
import { logout } from '../../store/auth/authSlice'

const NavbarInUserComponent = () => {

    const router = useRouter()
    const dispatch = useRootDispatch()

    const logoutFunc = () => {
        dispatch(logout())
        router.push('/')
    }
    const pushToContacts = () => router.push('/user/user_contacts')
    const pushToBonuses = () => router.push('/user/bonuses')
    const pushToAdress = () => router.push('/user/adress')
    const pushToHistoryOfOrders = () => router.push('/user/history_of_orders')

    return <div className={style.navigate}>
        <div className={style.navigateEl} onClick={pushToHistoryOfOrders}>История заказов</div>
        <div className={style.navigateEl} onClick={pushToAdress}>Адрес доставки</div>
        <div className={style.navigateEl} onClick={pushToBonuses}>Скидки и бонусы</div>
        <div className={style.navigateEl} onClick={pushToContacts}>Контактные данные</div>
        <div className={style.navigateEl} onClick={logoutFunc}>Выход</div>
    </div>
}

export default NavbarInUserComponent