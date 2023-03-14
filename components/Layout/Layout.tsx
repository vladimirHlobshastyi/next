import Footer from "../Footer/Footer"
import NavBar from "../NavBar/NavBar"
import style from './Layout.module.scss'

type LayoutTypes = { children: JSX.Element | JSX.Element[], categories: any }

const Layout = ({ children, categories }: LayoutTypes) => {
    return <div className={style.layouContainer}>
        <NavBar categories={categories}/>
        <div className={style.layouChildren}>
            {children}
        </div>
        <Footer />
    </div>

}

export default Layout