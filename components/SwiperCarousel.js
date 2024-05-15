import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MediaCard from './Card';
import { Margin, WidthFull } from '@mui/icons-material';

export default function SwiperCarousel({ data }) {
  return (
    <Swiper
      effect='cube'
      spaceBetween="100px"
      slidesPerView={5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      WidthFull
    >
      {Object.values(data).map((card) => (
        <SwiperSlide  key={card.testo} sx={{ display: "flex", spaceBetween:"100px"}}> {/* Assicurati di aggiungere una chiave univoca per ogni elemento */}
          <MediaCard card={card}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
