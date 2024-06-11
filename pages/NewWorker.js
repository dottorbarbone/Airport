import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "@/components/Navbar";
import styled from "@/styles/form.module.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Rating } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

// Inizializza l'app Firebase con la tua configurazione
const firebaseConfig = {
  apiKey: "AIzaSyCRSKa7KKzz9Ij2HGE95wvrdmdlelCOpPk",
  authDomain: "airport-fa47c.firebaseapp.com",
  databaseURL:
    "https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "airport-fa47c",
  storageBucket: "airport-fa47c.appspot.com",
  messagingSenderId: "678400117579",
  appId: "1:678400117579:web:12f3a1d1fb0f0900c136ce",
  measurementId: "G-T4JEQB42M0",
};
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export default function NewCard() {
  const [user, setUser] = useState({
    id: "",
    nome: "",
    cognome: "",
    età: "",
    immagineprofilo:"",
    esperienza: false,
    reparto: "",
    abilitato: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : type === "number" ? parseInt(value) : value;
    setUser({ ...user, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, cognome, età, immagineprofilo, esperienza, reparto, abilitato } = user;

    try {
      // Aggiungi una nuova card al database Firebase
      const newCardRef = await push(ref(database, "worker"), {
        nome,
        cognome,
        età,
        immagineprofilo,
        esperienza,
        reparto,
        abilitato,
      });

      // Recupera l'ID generato per la nuova card
      const newCardId = newCardRef.key;

      // Aggiorna lo stato della card con l'ID generato
      setUser({ ...user, id: newCardId });
      console.log("id è " + newCardId);

      alert("Dati salvati nel database");
    } catch (error) {
      console.error(
        "Si è verificato un errore durante il salvataggio dei dati:",
        error
      );
      alert("Si sono verificati problemi durante il salvataggio dei dati");
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Typography
        variant="h4"
        sx={{ marginLeft: "10%", marginTop: "30px", color: "white" }}
      >
        Crea una nuova card visibile allo staff dell'aeroporto.
      </Typography>
      <form className={styled.form} onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ color: "white" }}>
          Nome
        </Typography>
        <TextField
          fullWidth
          type="text"
          name="nome"
          value={user.nome}
          onChange={handleChange}
          required
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
        />
        <br />
        <br />
        <Typography variant="h5" sx={{ color: "white" }}>
          Cognome
        </Typography>
        <TextField
          fullWidth
          type="text"
          name="cognome"
          value={user.cognome}
          onChange={handleChange}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
        />
        <br />
        <br />
        <Typography variant="h5" sx={{ color: "white" }}>
          Reparto
        </Typography>
        <TextField
          fullWidth
          type="text"
          name="reparto"
          value={user.reparto}
          onChange={handleChange}
          required
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
        />
        <br />
        <br />
        <Typography variant="h5" sx={{ color: "white" }}>
            Età
        </Typography>
        <TextField
          fullWidth
          type="number"
          name="età"
          value={user.età}
          onChange={handleChange}
          required
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
        />
        <br />
        <br />
        <Typography variant="h5" sx={{ color: "white" }}>
            Immagine Profilo
        </Typography>
        <TextField
          fullWidth
          type="text"
          name="immagineprofilo"
          value={user.immagineprofilo}
          onChange={handleChange}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
        />
        <br />
        <br />
        <div style={{display:'flex '}}>
        <Typography component="legend" sx={{ color: "white" }}>
            Esperienza
          </Typography> &emsp;
          <Rating
            precision={0.5}
            name="esperienza"
            value={user.esperienza}
            onChange={(event, newValue) =>
              handleChange({ target: { name: "esperienza", value: newValue } })
            }
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            float: "left",
            marginTop: "10px",
          }}
        >
          <Typography variant="h6" sx={{ marginTop: "4px", color: "white" }}>
            {" "}
            Abilitato{" "}
          </Typography>
          <Checkbox
            id="abilitato"
            size="medium"
            name="abilitato"
            checked={user.abilitato}
            onChange={handleChange}
            inputProps={{ "aria-label": "Controllo completamento" }}
            sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          className={styled.invia}
          sx={{ marginTop: "30px", color: "white", borderColor: "white" }}
        >
          Inserisci
        </Button>
      </form>
    </>
  );
}
