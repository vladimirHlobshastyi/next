import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import style from './SwiperComponent.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';
import 'swiper/css/effect-flip';
import Image from 'next/image';

const mocFrame = [
  { id: 1, img: '/Frame_1.webp' },
  { id: 2, img: '/Frame_2.webp' },
  { id: 3, img: '/Frame_3.webp' },
  { id: 4, img: '/Frame_4.webp' },
];

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
        {mocFrame.map((frame) => {
          return (
            <SwiperSlide key={frame.id} className={style.swaperItem}>
              <Image
                src={frame.img}
                alt="image"
                width={1000}
                height={1000}
                priority
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SwiperComponent;
