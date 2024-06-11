import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "@/components/Navbar";
import styled from "@/styles/form.module.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Rating } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCRSKa7KKzz9Ij2HGE95wvrdmdlelCOpPk",
  authDomain: "airport-fa47c.firebaseapp.com",
  databaseURL: "https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "airport-fa47c",
  storageBucket: "airport-fa47c.appspot.com",
  messagingSenderId: "678400117579",
  appId: "1:678400117579:web:12f3a1d1fb0f0900c136ce",
  measurementId: "G-T4JEQB42M0"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export default function UpdateShop() {
  const router = useRouter();
  const { id } = router.query;

  const [shop, setShop] = useState({
    id: "",
    nome: "",
    tipologia: "",
    grandezza: "",
    valutazione: 0,
    tabellone: "",
    immagine: "",
    corrente: false,
    wifi: false,
    abilitato: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setShop({ ...shop, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, tipologia, grandezza, valutazione, tabellone, immagine, corrente, wifi, abilitato } = shop;

    try {
      await push(ref(database, 'shop'), {
        nome,
        tipologia,
        grandezza,
        valutazione,
        tabellone,
        immagine,
        corrente,
        wifi,
        abilitato,
      });

      alert("Dati salvati nel database");
      router.push("/"); // Reindirizza l'utente dopo il salvataggio
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Si sono verificati problemi durante il salvataggio dei dati");
    }
  };

  const handleDelete = async () => {
    try {
      const shopRef = ref(database, `shop/${id}`);
      await remove(shopRef);
      alert("Shop eliminato con successo");
      router.push("/"); // Reindirizza l'utente dopo l'eliminazione
    } catch (error) {
      console.error("Errore durante l'eliminazione dello shop:", error);
      alert("Si sono verificati problemi durante l'eliminazione dello shop");
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Typography
        variant="h4"
        sx={{ marginLeft: "10%", marginTop: "30px", color: "white" }}
      >
        Aggiorna i dati dello shop.
      </Typography>
      <form className={styled.form} onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ color: "white" }}>
          Nome ristorante
        </Typography>
        <TextField
          fullWidth
          type="text"
          name="nome"
          value={shop.nome}
          onChange={handleChange}
          required
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />
        <br /><br />
        <Typography variant="h5" sx={{ color: "white" }}>
          Tipologia
        </Typography>
        <Typography variant="body2" sx={{ color: "grey" }}>
          es (ristorante, negozio, fastfood)
        </Typography>
        <TextField
          fullWidth
          type="text"
          name="tipologia"
          value={shop.tipologia}
          onChange={handleChange}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />
        <br /><br />
        <Typography variant="h5" sx={{ color: "white" }}>
          Grandezza Negozio
        </Typography>
        <Typography variant="body2" sx={{ color: "grey" }}>
          in metri quadri
        </Typography>
        <TextField
          fullWidth
          type="number"
          name="grandezza"
          value={shop.grandezza}
          onChange={handleChange}
          required
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />
        <br /><br />
        <Typography variant="h5" sx={{ color: "white" }}>
          Tabellone
        </Typography>
        <Typography variant="body2" sx={{ color: "grey" }}>
          Scritta che compare all'esterno del negozio
        </Typography>
        <TextField
          fullWidth
          type="text"
          name="tabellone"
          value={shop.tabellone}
          onChange={handleChange}
          required
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />
        <br /><br />
        <Typography variant="h5" sx={{ color: "white" }}>
          Immagine
        </Typography>
        <Typography variant="body2" sx={{ color: "grey" }}>
          Immagine che compare all'esterno del negozio
        </Typography>
        <TextField
          fullWidth
          type="text"
          name="immagine"
          value={shop.immagine}
          onChange={handleChange}
          required
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />
        <br /><br />
        <div style={{ display: 'flex ' }}>
          <Typography variant="body1" sx={{ color: "white" }}>
            Valutazione negozio/ristorante
          </Typography>
          <Rating
            precision={0.25}
            name="valutazione"
            value={shop.valutazione}
            onChange={(event, newValue) =>
              handleChange({ target: { name: "valutazione", value: newValue } })
            }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', float: 'left', marginTop: '10px' }}>
          <Typography variant="h6" sx={{ marginTop: '4px', color: "white" }}> Wifi Abilitato </Typography>
          <Checkbox
            id="wifi"
            size="medium"
            name="wifi"
            checked={shop.wifi}
            onChange={handleChange}
            inputProps={{ "aria-label": "Controllo completamento" }}
            sx={{ color: "white", '&.Mui-checked': { color: "white" } }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', float: 'left', marginTop: '10px' }}>
            <Typography variant="h6" sx={{ marginTop: '4px', color: "white" }}> Corrente </Typography>
            <Checkbox
              id="corrente"
              size="medium"
              name="corrente"
              checked={shop.corrente}
              onChange={handleChange}
              inputProps={{ "aria-label": "Controllo corrente" }}
              sx={{ color: "white", '&.Mui-checked': { color: "white" } }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', float: 'left', marginTop: '10px' }}>
            <Typography variant="h6" sx={{ marginTop: '4px', color: "white" }}> Abilitato </Typography>
            <Checkbox
              id="abilitato"
              size="medium"
              name="abilitato"
              checked={shop.abilitato}
              onChange={handleChange}
              inputProps={{ "aria-label": "Controllo abilitato" }}
              sx={{ color: "white", '&.Mui-checked': { color: "white" } }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className={styled.invia}
            sx={{ marginTop: '30px', color: "white", borderColor: "white" }}
          >
            Inserisci
          </Button>
        </form>
      </>
    );
}
