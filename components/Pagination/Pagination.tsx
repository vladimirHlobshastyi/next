import { Dispatch, SetStateAction, useMemo } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import style from './Pagination.module.scss';

type paginationProps = {
    totalPage: number;
    page: number;
    callb: Dispatch<SetStateAction<number>>;
};

const Pagination = ({ page, totalPage, callb }: paginationProps) => {
    const isMobile = useIsMobile()
    const maxPages = isMobile ? 3 : 5;
    const startIndex = Math.max(1, page - Math.floor(maxPages / 2));
    const endIndex = Math.min(totalPage, startIndex + maxPages - 1);

    const pages = useMemo(() => {
        let res = [];
        for (let i = startIndex; i <= endIndex; i++) {
            res.push(i);
        }
        return res;
    }, [startIndex, endIndex]);

    const isActiveClass = (item: number) => (item === page ? style.active : style.disabled);

    const renderPaginationButton = (item: number) => (
        <div onClick={() => callb(item)} className={`${style.paginationButton} ${isActiveClass(item)}`} key={item}>
            {item}
        </div>
    );

    return (
        <div className={style.paginationContainer}>
            {startIndex > 1 && (
                <>
                    {renderPaginationButton(1)}
                    {startIndex > 2 && <div className={style.paginationButton}>...</div>}
                </>
            )}
            {pages.map((item) => renderPaginationButton(item))}
            {endIndex < totalPage && (
                <>
                    {endIndex < totalPage - 1 && <div className={style.paginationButton}>...</div>}
                    {renderPaginationButton(totalPage)}
                </>
            )}
        </div>
    );
};

export default Pagination;

