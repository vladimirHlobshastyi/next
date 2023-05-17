import { useState } from 'react'
import style from './Dropdown.module.scss'
import { GoChevronDown } from 'react-icons/go';
import { DropdownTypes } from './Dropdown.types';
import Link from 'next/link';


const Dropdown = ({ catalogName, info, infoForProduct, calb }: DropdownTypes) => {
    const [isVisibleCategory, setIsVisibleCategory] = useState(false)

    return <div className={style.sidePanelCatalogElement} data-cy={infoForProduct?.nameWrapper}>
        <div className={style.sidePanelCatalogElementC1} onClick={() => setIsVisibleCategory(!isVisibleCategory)}>
            <span>{catalogName || infoForProduct?.nameWrapper}</span>
            <div className={style.sidePanelCatalogElementSvg}><GoChevronDown /></div>
        </div>
        {isVisibleCategory && <div className={style.sidePanelCatalogElementOpen}>
            {info?.map((navigateCategory) => {
                return <div className={style.sidePanelCatalogElementOpenСategory} data-cy={'dropDown ' + infoForProduct?.nameWrapper || catalogName} key={navigateCategory.id} onClick={calb}>
                    <Link href={`/category/${navigateCategory.name}`}>{navigateCategory.name}</Link>
                </div>
            })}
            {infoForProduct?.dropDownItem}
        </div>}
    </div>
}

export default Dropdown