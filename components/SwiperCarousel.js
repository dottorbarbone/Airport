import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MediaCard from './Card';
import { Margin, WidthFull } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';

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
    
    {data && Object.values(data).length > 0 ? (
      Object.values(data).map((card) => (
        <SwiperSlide key={card.testo} sx={{ display: "flex" }}>
          <MediaCard card={card} />
        </SwiperSlide>
      ))
    ) : (
      <center>
        <Alert severity="success" sx={{maxWidth:'80%', marginTop:'45px'}}>No Card to do</Alert>
      </center>
      
    )}



    </Swiper>
  );
}
