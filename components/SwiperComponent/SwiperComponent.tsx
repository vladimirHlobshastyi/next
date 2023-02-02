import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import style from './SwiperComponent.module.scss'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
import "swiper/css/effect-flip";
import Image from "next/image";


const mocFrame = [
    { id: 1, img: './Frame_1.png' },
    { id: 2, img: './Frame_2.png' },
    { id: 3, img: './Frame_3.png' },
    { id: 4, img: './Frame_4.png' },]

const SwiperComponent = () => {

    return (
        <>
            <Swiper
                slidesPerView={2}
                spaceBetween={30}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {mocFrame.map((item) => {
                    return <SwiperSlide key={item.id} className={style.swaperItem}>
                        <Image src={item.img} alt="image" />
                    </SwiperSlide>
                })}


            </Swiper>
        </>
    );
}

export default SwiperComponent