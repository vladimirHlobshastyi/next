import { useRouter } from 'next/router'
import NavbarInUserComponent from '../../components/NavbarInUserComponent/NavbarInUserComponent'
import style from './user_contacts.module.scss'
import useIsAuth from '../../hooks/useIsAuth'

const HistoryOrders = () => {
    const router = useRouter()
    const { isAuth } = useIsAuth()
    if (!isAuth) {
        router.push('/login')
        return <div className={style.container}></div>
    }
    return <div className={style.container}>
        <div className={style.navigate}><NavbarInUserComponent /></div>
        <div className={style.formContainer}>История заказов</div>
    </div>
}

export default HistoryOrders
