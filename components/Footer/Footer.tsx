import style from './Footer.module.scss'

const Footer = () => {

    return (
        <div className={style.navBarContainer}>
            <h5>Used a free platform test api </h5>
            <a href='https://jsonplaceholder.typicode.com'>https://jsonplaceholder.typicode.com</a>
        </div>
    )
}

export default Footer