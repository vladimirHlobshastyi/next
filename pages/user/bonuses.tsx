import NavbarInUserComponent from '../../components/NavbarInUserComponent/NavbarInUserComponent'
import style from './user_contacts.module.scss'

const Bonuses = () => {
    return <div className={style.container}>
        <div className={style.navigate}><NavbarInUserComponent /></div>
        <div className={style.formContainer}>Скидки и Бонусы</div>
    </div>
}

export default Bonuses
