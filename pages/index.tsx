import { Inter } from '@next/font/google'
import NavBar from '../components/NavBar/NavBar'
import style from './../styles/Home.module.scss'
import Footer from '../components/Footer/Footer'
import HeadComponent from '../components/Head/HeadComponent'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={style.container}>
      <HeadComponent description='test project, main link'
        viewport='width=device-width, initial-scale=1'
      />
      <NavBar />
      <div className={style.wrapper}>
        <div className={style.wrapperContent}>Welcome to the NEXT JS test project</div>
      </div>
      <Footer />
    </div>
  )
}
