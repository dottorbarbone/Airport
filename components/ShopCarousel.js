import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { LinearProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import ShopCard from "./ShopCard";

export default function ShopCarousel({ shop }) {
  const [shops, setShops] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shop) {
      console.log("Dati negozio ricevuti in ShopCarousel:", shop);
      const loadedShops = Object.keys(shop).map(key => ({ id: key, ...shop[key] }));
      console.log("Negozio caricati:", loadedShops);
      setShops(loadedShops);
      setLoaded(true);
    }
  }, [shop]);

  return loaded ? (
    <Swiper
      effect="cube"
      spaceBetween={100}
      slidesPerView={4}
      onSlideChange={() => console.log("Cambio di slide")}
    >
      {shops.length > 0 ? (
        shops.map((shop) => (
          <SwiperSlide key={shop.id} style={{ display: "flex" }}>
            <ShopCard shop={shop} />
          </SwiperSlide>
        ))
      ) : (
        <center>
          <Alert severity="error" style={{ maxWidth: "80%", marginTop: "45px" }}>
            Non ci sono negozi disponibili!
          </Alert>
        </center>
      )}
    </Swiper>
  ) : (
    <LinearProgress />
  );
}
