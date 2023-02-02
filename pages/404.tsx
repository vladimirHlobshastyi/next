import { useRouter } from 'next/router'
/* import { useEffect } from 'react'
 */import style from '../styles/Home.module.scss'

const NotFoundPage = () => {
    const router = useRouter()

    /* useEffect(() => { setTimeout(() => router.push('/'), 2000) }, []) */

    return <div className={style.notFoundContainer}><span>Oops</span></div>
}

export default NotFoundPage

