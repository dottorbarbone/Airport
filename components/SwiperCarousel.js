import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MediaCard from './Card';

export default function SwiperCarousel({ data }) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.map((cards) => (
        <SwiperSlide key={card.ids}> {/* Assicurati di aggiungere una chiave univoca per ogni elemento */}
          <MediaCard card={cards} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
