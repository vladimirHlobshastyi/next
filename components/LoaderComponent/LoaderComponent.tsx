import Image from 'next/image';
import style from './LoaderComponent.module.scss';

const LoaderComponent = () => {
  return (
    <div className={style.container} data-cy={'lader_component'}>
      <div className={style.spinner}>
        <Image src="/Spiner.svg" width={50} height={50} alt="...LOADING..." />
      </div>
    </div>
  );
};

export default LoaderComponent;
