import Link from "next/link"
import { FC } from "react"
import style from './NavigateControl.module.scss'

const NavigateControl: FC<{ navItem: string[] }> = ({ navItem }) => {
    return <div className={style.contentNavigate}>
        <Link href={`/categories`}>Категории/</Link>
        {navItem.map((categoryName) =>
            <Link href={`${categoryName}`} key={categoryName}>{categoryName}</Link>)}

    </div>
}

export default NavigateControl