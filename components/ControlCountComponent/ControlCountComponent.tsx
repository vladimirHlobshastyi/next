import style from './ControlCountComponent.module.scss'

type ControlCountComponentType = { countProductsInCart: number }

const ControlCountComponent = ({ countProductsInCart }: ControlCountComponentType) => {
    return <div className={style.container}><span>{countProductsInCart}</span></div>
}

export default ControlCountComponent