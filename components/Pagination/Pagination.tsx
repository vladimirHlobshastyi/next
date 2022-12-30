import { Dispatch, SetStateAction } from 'react'
import style from './Pagination.module.scss'

type paginationProps = {
    totalPage: number, page: number,
    callb: Dispatch<SetStateAction<number>>
}
const Pagination = ({ page, totalPage, callb }: paginationProps) => {
    const pages = () => {
        let res = []
        for (let i = 1; i <= totalPage; i++) {
            res.push(i)
        }
        return res
    }
    const isActiveClass = (item: number) => item === page ? style.active : style.disabled
    return <div className={style.paginationContainer}>
        {pages().map((item) =>
            <div
                onClick={(_e) => callb(item)}
                className={`${style.paginationButton}  ${isActiveClass(item)}`}>
                {item}
            </div>)}
    </div>
}

export default Pagination