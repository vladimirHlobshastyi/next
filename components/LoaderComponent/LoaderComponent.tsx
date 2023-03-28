import Image from 'next/image';
import style from './LoaderComponent.module.scss';
import Spiner from '../../public/Spiner.svg';

const LoaderComponent = () => {
    return (
        <div className={style.container}>
            <div className={style.spinner}>
                <Image src={Spiner} alt="...LOADING..." />
            </div>
        </div>
    );
};

export default LoaderComponent;