import { useState } from 'react'
import style from './Dropdown.module.scss'
import { GoChevronDown } from 'react-icons/go';
import { DropdownTypes } from './Dropdown.types';


const Dropdown = ({ nameWrapper, dropDownItem }: DropdownTypes) => {
    const [isVisibleCategory1, setIsVisibleCategory1] = useState(false)

    return <div className={style.sidePanelCatalogElement} onClick={() => setIsVisibleCategory1(!isVisibleCategory1)}>
        <div className={style.sidePanelCatalogElementC1}>
            <span>{nameWrapper}</span>
            <div className={style.sidePanelCatalogElementSvg}><GoChevronDown /></div>
        </div>
        {isVisibleCategory1 && <div className={style.sidePanelCatalogElementOpen}>
            {dropDownItem.map((item, index) => {
                return <div className={style.sidePanelCatalogElementOpenСategory} key={item + index}>
                    {item}
                </div>
            })}
        </div>}
    </div>
}

export default Dropdown