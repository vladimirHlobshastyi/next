import Link from 'next/link'
import style from './NavBar.module.scss'

const NavBar = () => {


    return (
        <div className={style.navBarContainer}>
            <Link href='/users' className={style.navBarButton}>Users</Link>
            <Link href='/posts' className={style.navBarButton}>Posts</Link>
            <Link href='/' className={style.navBarButton}>Home</Link>
        </div>
    )
}

export default NavBar