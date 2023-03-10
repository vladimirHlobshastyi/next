import Link from 'next/link'
import style from './NavBar.module.scss'
import { BsInstagram, BsTelegram } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { TfiYoutube } from "react-icons/tfi";
import { BiXCircle, BiSearch, BiUser, BiHeart, BiCart, BiBarChart, BiMenuAltLeft } from "react-icons/bi";
import { useEffect, useMemo, useRef, useState } from 'react'
import useClickOutsideDiv from '../../hooks/useClickOutsideDiv'
import Image from 'next/image'
import Dropdown from '../Dropdown/Dropdown'
import useAppSelector from '../../hooks/useAppSelector';
import ControlCountComponent from '../ControlCountComponent/ControlCountComponent';
import classNames from 'classnames';
import { rootTotalCountInCart } from '../../store/cart/cartSlice';
import { rootCountInFavorites } from '../../store/favorites/favoritesSlice';
import { rootCountInCompare } from '../../store/compare/compareSlice';
import Logo from '../../public/Logo.svg'


export type CategoryTypes = { name: string; id: string }[];



const NavBar = ({ categories }: { categories: CategoryTypes }) => {
  const rootEl: React.MutableRefObject<null> = useRef(null);
  const [isVisible, setIsVisible] = useState(false)

  const totalCountProducts = useAppSelector(rootTotalCountInCart)
  const totalCountFavorites = useAppSelector(rootCountInFavorites)
  const totalCountCompare = useAppSelector(rootCountInCompare)

  const navBarAreaControlsClass = useMemo(
    () =>
      classNames(style.navBarAreaControls, isVisible ? style.navBarAreaControlsMobile : ''),
    [isVisible]
  );
  const navBarCallPhoneclass = useMemo(
    () =>
      classNames(style.navBarCallPhone, isVisible ? style.navBarCallPhoneDropDown : ''),
    [isVisible]
  );
  const navBarLogoClass = useMemo(
    () => classNames(style.navBarLogo, isVisible ? style.navBarLogoDropDown : ''),
    [isVisible]
  );
  const navBarMenuClass = useMemo(
    () => classNames(style.navBarMenu, isVisible ? style.navBarMenuDropDown : ''),
    [isVisible]
  );
  const navBarContainerClass = useMemo(
    () => classNames(style.navBarContainer, isVisible ? style.navBarContainerDropDown : ''),
    [isVisible]
  );
  const controlCount = (totalCount: number) => {
    const result = useMemo(() => totalCount ? <ControlCountComponent countProductsInCart={totalCount} /> : null, [totalCount])
    return result
  }
  const closeSidePanel = (isClose: boolean) => () => setIsVisible(isClose)

  useClickOutsideDiv(rootEl, () => {
    console.log('UseCLick......' + isVisible)
    //setIsVisible(false)
  })


  return (<>
    <div className={navBarContainerClass}>
      <div className={navBarMenuClass} onClick={closeSidePanel(!isVisible)} >
        <BiMenuAltLeft />
        <span>????????</span>
      </div>
      <div className={navBarLogoClass} onClick={closeSidePanel(false)}>
        <Link href='/'>
          <Image src={Logo} width={180} height={39} alt='Logo' />
        </Link>
      </div>
      <div className={navBarAreaControlsClass}>
        <Link href='/serch' ><BiSearch /></Link>
        <Link href='/user' ><BiUser /></Link>
        <Link href='/compare' onClick={closeSidePanel(false)}><BiBarChart />
          {controlCount(totalCountCompare)}</Link>
        <Link href='/favorites' onClick={closeSidePanel(false)}><BiHeart />
          {controlCount(totalCountFavorites)}
        </Link>
        <Link href='/cart' onClick={closeSidePanel(false)}><BiCart />
          {controlCount(totalCountProducts)}</Link>
      </div>
      <div className={navBarCallPhoneclass}><IoCallOutline /></div>
    </div>
    {
      isVisible && <div className={style.sidePanelContainer} >
        <div className={style.sidePanelContainerRelative}>
          <div className={style.sidePanel} ref={rootEl}>
            <div className={style.sidePanelCatalog}>
              <div className={style.sidePanelCatalogElement}
                onClick={closeSidePanel(!isVisible)}><Link href={'/categories'} onClick={closeSidePanel(!isVisible)}><h3>??????????????????</h3></Link></div>
              <div className={style.sidePanelCatalogElement} >
                <Dropdown catalogName='???????????????????????????????? ??????????????' info={categories} calb={closeSidePanel(!isVisible)} />
              </div>
              <div className={style.sidePanelCatalogElement}>
                <Link href='/'> ?????????????? 2(????????????)</Link>
              </div>
              <div className={style.sidePanelCatalogElement}>
                <Link href='/'> ?????????????? 3(????????????)</Link>
              </div>
            </div>

            <div className={style.sidePanelCatalogMenu} >
              <div className={style.sidePanelCatalogMenuElement}>
                <h3>????????</h3>
              </div>
              <div className={style.sidePanelCatalogMenuElement} onClick={closeSidePanel(!isVisible)}>
                <Link href='/about-us'>?? ????????????????</Link>
              </div>
              <div className={style.sidePanelCatalogMenuElement} onClick={closeSidePanel(!isVisible)}>
                <Link href='/contacts'>????????????????</Link>
              </div>
              <div className={style.sidePanelCatalogMenuElement} onClick={closeSidePanel(!isVisible)} >
                <Link href='/'>????????????</Link>
              </div>
              <div className={style.sidePanelCatalogMenuElement} onClick={closeSidePanel(!isVisible)}>
                <Link href='/'>???????????? ??????????????</Link>
              </div>
              <div className={style.sidePanelCatalogMenuElement} onClick={closeSidePanel(!isVisible)}>
                <Link href='/'>????????</Link>
              </div>
            </div>
            <div className={style.sidePanelCatalogMenu} >
              <div className={style.sidePanelCatalogMenuElement}>
                <h3>????????????????</h3>
              </div>
              <div className={style.sidePanelCatalogMenuElement}>
                +38(066) 800-80-80
              </div>
              <div className={style.sidePanelCatalogMenuElement}>
                ??.????????, ????.???????????????????? 100
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
        </div><div className={style.closeIcon} onClick={closeSidePanel(!isVisible)}><BiXCircle /></div>

      </div>
    }
  </>
  )

}

export default NavBar 
