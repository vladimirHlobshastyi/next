import Footer from "../Footer/Footer"
import NavBar from "../NavBar/NavBar"
import style from './Layout.module.scss'

type LayoutTypes = { children: JSX.Element | JSX.Element[] }

const Layout = ({ children }: LayoutTypes) => {
    return <div className={style.layouContainer}>
        <NavBar />
        <div className={style.layouChildren}>
            {children}
        </div>
        <Footer />
    </div>

}

export default Layout