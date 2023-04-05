import NavbarInUserComponent from '../../components/NavbarInUserComponent/NavbarInUserComponent'
import style from './user_contacts.module.scss'

const HistoryOrders = () => {
    return <div className={style.container}>
        <div className={style.navigate}><NavbarInUserComponent /></div>
        <div className={style.formContainer}>История заказов</div>
    </div>
}

export default HistoryOrders
