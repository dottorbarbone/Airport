import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "@/components/Navbar";
import styled from "@/styles/form.module.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

// Inizializza l'app Firebase con la tua configurazione
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

export default function NewCard() {
  const [user, setUser] = useState({
    id: "",
    titolo: "",
    descrizione: "",
    immagine: "",
    completato: false,
    amministrativa: false,
    schermo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setUser({ ...user, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { titolo, descrizione, immagine, completato, amministrativa, schermo } = user;

    try {
      // Aggiungi una nuova card al database Firebase
      const newCardRef = await push(ref(database, 'cards'), {
        titolo,
        descrizione,
        immagine,
        completato,
        amministrativa,
        schermo,
      });

      // Recupera l'ID generato per la nuova card
      const newCardId = newCardRef.key;

      // Aggiorna lo stato della card con l'ID generato
      setUser({ ...user, id: newCardId });
      console.log("id è " + newCardId)

      alert("Dati salvati nel database");
    } catch (error) {
      console.error("Si è verificato un errore durante il salvataggio dei dati:", error);
      alert("Si sono verificati problemi durante il salvataggio dei dati");
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Typography variant="h4" sx={{ marginLeft: "10%", marginTop: "30px", color: "white" }}>
        Crea una nuova card visibile allo staff dell'aeroporto.
      </Typography>
      <form className={styled.form} onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ color: "white" }}>Titolo</Typography>
        <TextField
          fullWidth
          type="text"
          name="titolo"
          value={user.titolo}
          onChange={handleChange}
          required
          sx={{
            '& .MuiInputBase-input': {
              color: 'white'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'white',
            }
          }}
        /><br /><br />
        <Typography variant="h5" sx={{ color: "white" }}>Descrizione</Typography>
        <TextField
          fullWidth
          type="text"
          name="descrizione"
          value={user.descrizione}
          onChange={handleChange}
          sx={{
            '& .MuiInputBase-input': {
              color: 'white'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'white',
            }
          }}
        /><br /><br />
        <Typography variant="h5" sx={{ color: "white" }}>Immagine</Typography>
        <TextField
          fullWidth
          type="text"
          name="immagine"
          value={user.immagine}
          onChange={handleChange}
          required
          sx={{
            '& .MuiInputBase-input': {
              color: 'white'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'white',
            }
          }}
        /><br /><br />
        <div style={{ display: 'flex', flexDirection: 'row-reverse', float: 'left', marginTop: '10px' }}>
          <Typography variant="h6" sx={{ marginTop: '4px', color: "white" }}> Completato </Typography>
          <Checkbox
            id="completato"
            size="medium"
            name="completato"
            checked={user.completato}
            onChange={handleChange}
            inputProps={{ "aria-label": "Controllo completamento" }}
            sx={{ color: "white", '&.Mui-checked': { color: "white" } }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', float: 'left', marginTop: '10px' }}>
          <Typography variant="h6" sx={{ marginTop: '4px', color: "white" }}> Visione Amministrativa </Typography>
          <Checkbox
            id="amministrativa"
            size="medium"
            name="amministrativa"
            checked={user.amministrativa}
            onChange={handleChange}
            inputProps={{ "aria-label": "Controllo amministrativa" }}
            sx={{ color: "white", '&.Mui-checked': { color: "white" } }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', float: 'left', marginTop: '10px' }}>
          <Typography variant="h6" sx={{ marginTop: '4px', color: "white" }}> Mostra nello schermo </Typography>
          <Checkbox
            id="schermo"
            size="medium"
            name="schermo"
            checked={user.schermo}
            onChange={handleChange}
            inputProps={{ "aria-label": "Controllo schermo" }}
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
