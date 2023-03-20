import { IoIosArrowDropup } from "react-icons/io";
import style from './ArrowDropup.module.scss'

const ArrowDropup = ({ calb }: { calb: () => void }) => {
  return <div className={style.container} onClick={calb}><IoIosArrowDropup /></div>
};

export default ArrowDropup;
