
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { LinearProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import WorkerCard from "./WorkerCard";

export default function WorkerCarousel({ worker }) {
  const [cardd, setCards] = useState([]);
  const [caricato, setCaricato] = useState(false);

  useEffect(() => {
    if (worker) {
      console.log("Worker data received in WorkerCarousel:", worker);
      const loadedCards = [];
      for (let key in worker) {
        loadedCards.push({ id: key, ...worker[key] });
      }
      console.log("Loaded cards:", loadedCards);
      setCards(loadedCards);
      setCaricato(true);
    }
  }, [worker]);

  return caricato ? (
    <Swiper
      effect="cube"
      spaceBetween={100}
      slidesPerView={4}
      onSlideChange={() => console.log("slide change")}
    >
      {cardd.length > 0 ? (
        cardd.map((card) => (
          <SwiperSlide key={card.id} style={{ display: "flex"}}>
            <WorkerCard cardd={card} />
          </SwiperSlide>
        ))
      ) : (
        <center>
          <Alert severity="error" style={{ maxWidth: "80%", marginTop: "45px" }}>
            Non c'è nessuno al lavoro!
          </Alert>
        </center>
      )}
    </Swiper>
  ) : (
    <center>
    <Alert severity="error" style={{ maxWidth: "100%", marginTop: "45px" }}>
      Non c'è nessuno al lavoro!
    </Alert>
  </center>
  );
}
