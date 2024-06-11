import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MediaCard from "./Card";
import { LinearProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import { getDatabase, ref, onValue, off } from "firebase/database";
import Database from "../pages/firebase";
export default function NetflixCarousel({ data }) {
  const database = getDatabase();
  const [cards, setCards] = useState([]);
  const [caricato, setCaricato] = useState(false);

  useEffect(() => {
    const cardsRef = ref(database, "cards");
    const fetchData = () => {
      onValue(cardsRef, (snapshot) => {
        const data = snapshot.val();
        const loadedCards = [];
        for (let key in data) {
          loadedCards.push({ id: key, ...data[key] });
        }
        setCards(loadedCards);
        setCaricato(true);
      });
    };
    fetchData();

    // Rimuovi il listener quando il componente viene smontato per evitare memory leak
    return () => {
      off(cardsRef);
    };
  }, []);

  return caricato ? (
    <Swiper
      effect="cube"
      spaceBetween="100px"
      slidesPerView={4.5}
      onSlideChange={() => console.log("slide change")}
    >
      {cards.length > 0 ? (
        cards.map((card) => (
          <SwiperSlide
            key={card.id}
            sx={{ display: "flex", paddingLeft: "7.5%" }}
          >
            <MediaCard card={card} />
          </SwiperSlide>
        ))
      ) : (
        <center>
          <Alert severity="success" sx={{ maxWidth: "80%", marginTop: "45px" }}>
            No Card to do
          </Alert>
        </center>
      )}
    </Swiper>
  ) : (
    <LinearProgress />
  );
}
