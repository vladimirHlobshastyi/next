import Link from 'next/link'
import style from './NavBar.module.scss'
import { BsInstagram, BsTelegram } from "react-icons/bs";
import { TfiYoutube } from "react-icons/tfi";
import { BiXCircle, BiSearch, BiUser, BiHeart, BiCart, BiBarChart, BiMenuAltLeft } from "react-icons/bi";
import { useRef, useState } from 'react'
import useClickOutsideDiv from '../../hooks/useClickOutsideDiv'
import Image from 'next/image'
import Dropdown from '../Dropdown/Dropdown'

const NavBar = () => {
  const rootEl: React.MutableRefObject<null> = useRef(null);
  const [isVisible, setIsVisible] = useState(false)


  const closeSidePanel = () => setIsVisible(!isVisible)

  useClickOutsideDiv(rootEl, () => {
    console.log('UseCLick......' + isVisible)
    //setIsVisible(false)
  })

  return (<>
    <div className={style.navBarContainer}>
      <div className={style.navBarMenu} onClick={closeSidePanel} >
        <BiMenuAltLeft />
        <span>Меню</span>
      </div>
      <div className={style.navBarLogo}>
        <Link href='/'>
          <Image src='https://static.insales-cdn.com/files/1/2933/14871413/original/Group_8.svg' width={180} height={39} alt='Logo' />
        </Link>
      </div>
      <div className={style.navBarAreaControls}>
        <Link href='/serch' className={style.navBarSearch}><BiSearch /></Link>
        <Link href='/user' className={style.navBarUser}><BiUser /></Link>
        <Link href='/compare' className={style.navBarCompare}><BiBarChart /></Link>
        <Link href='/like' className={style.navBarLike}><BiHeart /></Link>
        <Link href='/cart' className={style.navBarCart}><BiCart /></Link>
      </div>
    </div>
    {isVisible && <div className={style.sidePanelContainer} >
      <div className={style.sidePanelContainerRelative}>
        <div className={style.sidePanel} ref={rootEl}>
          <div className={style.sidePanelCatalog}>
            <div className={style.sidePanelCatalogElement}><h3>Каталог</h3></div>
            <div className={style.sidePanelCatalogElement} >

              <Dropdown nameWrapper='Каталог 1' dropDownItem={['Подкатегория 1', 'Подкатегория 2']} />
            </div>
            <div className={style.sidePanelCatalogElement}>
              <Link href='/'> Каталог 2</Link>
            </div>
            <div className={style.sidePanelCatalogElement}>
              <Link href='/'> Каталог 3</Link>
            </div>
          </div>

          <div className={style.sidePanelCatalogMenu} >
            <div className={style.sidePanelCatalogMenuElement}>
              <h3>Меню</h3>
            </div>
            <div className={style.sidePanelCatalogMenuElement} onClick={closeSidePanel}>
              <Link href='/'>Каталог</Link>
            </div>
            <div className={style.sidePanelCatalogMenuElement} onClick={closeSidePanel}>
              <Link href='/about-us'>О компании</Link>
            </div>
            <div className={style.sidePanelCatalogMenuElement} onClick={closeSidePanel}>
              <Link href='/contacts'>Контакты</Link>
            </div>
            <div className={style.sidePanelCatalogMenuElement} onClick={closeSidePanel} >
              <Link href='/'>Оплата</Link>
            </div>
            <div className={style.sidePanelCatalogMenuElement} onClick={closeSidePanel}>
              <Link href='/'>Личный кабинет</Link>
            </div>
            <div className={style.sidePanelCatalogMenuElement} onClick={closeSidePanel}>
              <Link href='/'>Блог</Link>
            </div>
          </div>
          <div className={style.sidePanelCatalogMenu} >
            <div className={style.sidePanelCatalogMenuElement}>
              <h3>Контакты</h3>
            </div>
            <div className={style.sidePanelCatalogMenuElement}>
              +38(066) 800-80-80
            </div>
            <div className={style.sidePanelCatalogMenuElement}>
              г.Киев, ул.Барабулица 100
            </div>
          </div>
          <div className={style.sidePanelCatalogSoclinks} >
            <div className={style.sidePanelCatalogSoclinksLink}>
              <Link href='https://www.instagram.com/'> <BsInstagram /></Link>
            </div>
            <div className={style.sidePanelCatalogSoclinksLink}>
              <Link href='https://www.youtube.com/'> <BsTelegram /></Link>
            </div>
            <div className={style.sidePanelCatalogSoclinksLink}>
              <Link href='https://www.telegram.com/'><TfiYoutube /></Link>
            </div>



          </div>
        </div>
      </div><div className={style.closeIcon} onClick={closeSidePanel}><BiXCircle /></div>

    </div>}
  </>
  )
}

export default NavBar 
