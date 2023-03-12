import Image from 'next/image'
import Link from 'next/link'
import style from './Footer.module.scss'
import { BsInstagram, BsTelegram } from "react-icons/bs";
import { TfiYoutube } from "react-icons/tfi";
import Logo from '../../public/Logo.svg'

const Footer = () => {

    return (
        <div className={style.container}>
            <div className={style.info}>
                <div className={style.infoPhone}>
                    <div className={style.infoPhoneOne}> +38(066) 800-80-80</div>
                    <div className={style.infoPhoneTwo}>+38(066) 800-80-81</div>
                </div>
                <div className={style.infoStreet}> г.Киев, ул.Барабулица 100</div>
            </div>
            <div className={style.logo}>
                <Link href='/'>
                    <Image src={Logo} width={180} height={39} alt='Logo' />
                </Link>
            </div>
            <div className={style.social}>
                <div className={style.socialLink}>
                    <Link href='https://www.instagram.com/'><BsInstagram /></Link>
                </div>
                <div className={style.socialLink}>
                    <Link href='https://www.youtube.com/'><BsTelegram /></Link>
                </div>
                <div className={style.socialLink}>
                    <Link href='https://www.telegram.com/'><TfiYoutube /></Link>
                </div>
            </div>
        </div>
    )
}

export default Footer