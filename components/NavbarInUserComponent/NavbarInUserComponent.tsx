import { useRouter } from 'next/router'
import style from './NavbarInUserComponent.module.scss'
import useRootDispatch from '../../hooks/useRootDispatch'
import { logout } from '../../store/auth/authSlice'
import classNames from "classnames";
import { useState } from 'react';
import useIsActiveNavbar from '../../hooks/useIsActiveNavbar';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useIsMobile } from '../../hooks/useIsMobile';

const CONTACTS = '/user/user_contacts'
const BONUSES = '/user/bonuses'
const ADRESS = '/user/adress'
const HISTORY_OF_ORDERS = '/user/history_of_orders'

const NavbarInUserComponent = () => {

    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const router = useRouter()
    const isMobile = useIsMobile()
    const path = router.asPath

    const dispatch = useRootDispatch()
    const isActive = (variableString: string) => useIsActiveNavbar({ path, variableString });

    const historyOrdersClass = classNames(style.navigateEl, isActive(HISTORY_OF_ORDERS) ? style.active : '');
    const adressClass = classNames(style.navigateEl, isActive(ADRESS) ? style.active : '');
    const bonusesClass = classNames(style.navigateEl, isActive(BONUSES) ? style.active : '');
    const contactsClass = classNames(style.navigateEl, isActive(CONTACTS) ? style.active : '');
    const titleClass = classNames(style.navigateEl, style.title);
    const isDropdownClass = isOpenDropdown ? style.dropDownNavigate : style.dropDownNavigateNone

    const logoutFunc = () => {
        dispatch(logout())
        router.push('/')
    }
    const changeDropdown = () => setIsOpenDropdown(prevIsOpenDropdown => !prevIsOpenDropdown)
    const mobileDropDownIcon = isMobile && (isOpenDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />)

    const pushToContacts = () => router.push(CONTACTS)
    const pushToBonuses = () => router.push(BONUSES)
    const pushToAdress = () => router.push(ADRESS)
    const pushToHistoryOfOrders = () => router.push(HISTORY_OF_ORDERS)

    return <div className={style.navigate}>
        <div className={titleClass} onClick={changeDropdown}><span>Линый кабинет</span>{mobileDropDownIcon}</div>
        <div className={isDropdownClass} >
            <div className={historyOrdersClass} onClick={pushToHistoryOfOrders}>История заказов</div>
            <div className={adressClass} onClick={pushToAdress}>Адрес доставки</div>
            <div className={bonusesClass} onClick={pushToBonuses}>Скидки и бонусы</div>
            <div className={contactsClass} onClick={pushToContacts}>Контактные данные</div>
            <div className={style.navigateEl} onClick={logoutFunc}>Выход</div>
        </div>
    </div>
}

export default NavbarInUserComponent