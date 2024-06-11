import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "@/components/Navbar";
import styled from "@/styles/form.module.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Rating } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCRSKa7KKzz9Ij2HGE95wvrdmdlelCOpPk",
  authDomain: "airport-fa47c.firebaseapp.com",
  databaseURL: "https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "airport-fa47c",
  storageBucket: "airport-fa47c.appspot.com",
  messagingSenderId: "678400117579",
  appId: "1:678400117579:web:12f3a1d1fb0f0900c136ce",
  measurementId: "G-T4JEQB42M0",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export default function UpdateShop() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({
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

  useEffect(() => {
    if (id) {
      const shopRef = ref(database, `shop/${id}`);
      get(shopRef).then((snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val());
        } else {
          console.log("Nessun dato disponibile");
        }
      }).catch((error) => {
        console.error("Errore nel recupero dei dati:", error);
      });
    }
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const cardRef = ref(database, `shop/${id}`);
      await remove(cardRef);
      console.log("Shop eliminato con successo");
      alert("Shop eliminato con successo");
      router.push('/'); // Reindirizza l'utente dopo l'eliminazione
    } catch (error) {
      console.error("Errore durante l'eliminazione dello Shop:", error);
      alert("Si sono verificati problemi durante l'eliminazione dello Shop");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setUser({ ...user, [name]: newValue });
  };

  const handleRatingChange = (event, newValue) => {
    setUser({ ...user, valutazione: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nome,
      tipologia,
      grandezza,
      valutazione,
      tabellone,
      immagine,
      corrente,
      wifi,
      abilitato,
    } = user;

    try {
      const shopRef = ref(database, `shop/${id}`);
      await update(shopRef, {
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

      alert("Dati aggiornati nel database");
      router.push('/')
    } catch (error) {
      console.error(
        "Si è verificato un errore durante l'aggiornamento dei dati:",
        error
      );
      alert("Si sono verificati problemi durante l'aggiornamento dei dati");
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Typography
        variant="h4"
        sx={{ marginLeft: "10%", marginTop: "30px", color: "white" }}
      >
        Modifica il ristorante
      </Typography>
      <form className={styled.form} onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ color: "white" }}>
          Nome ristorante
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
          Tipologia
        </Typography>
        <Typography variant="body2" sx={{ color: "grey" }}>
          es (ristorante, negozio, fastfood)
        </Typography>
        <TextField
          fullWidth
          type="text"
          name="tipologia"
          value={user.tipologia}
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
          Grandezza Negozio
        </Typography>
        <Typography variant="body2" sx={{ color: "grey" }}>
          in metri quadri
        </Typography>
        <TextField
          fullWidth
          type="number"
          name="grandezza"
          value={user.grandezza}
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
          Tabellone
        </Typography>
        <Typography variant="body2" sx={{ color: "grey" }}>
          Scritta che compare all'esterno del negozio
        </Typography>
        <TextField
          fullWidth
          type="text"
          name="tabellone"
          value={user.tabellone}
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
        <br /> <br /> 
        <Typography variant="h5" sx={{ color: "white" }}>
          Immagine
        </Typography>
        <Typography variant="body2" sx={{ color: "grey" }}>
          Immagine che rappresenta il negozio
        </Typography>
        <TextField
          fullWidth
          type="text"
          name="immagine"
          value={user.immagine}
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
        <br/><br/><br/>
        <Typography variant="h4">Anteprima immagine:</Typography>
        <br /><br />
        <img src={user.immagine} style={{borderRadius:'5px', maxWidth:'350px'}}/>
        <br /><br /><br />
        <div style={{ display: "flex " }}>
          <Typography variant="body1" sx={{ color: "white" }}>
            Valutazione negozio/ristorante
          </Typography>{" "}
          &emsp;
          <Rating
            precision={0.25}
            name="valutazione"
            value={user.valutazione}
            onChange={handleRatingChange}
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
            Wifi Abilitato{" "}
          </Typography>
          <Checkbox
            id="wifi"
            size="medium"
            name="wifi"
            checked={user.wifi}
            onChange={handleChange}
            inputProps={{ "aria-label": "Controllo completamento" }}
            sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
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
            Corrente{" "}
          </Typography>
          <Checkbox
            id="corrente"
            size="medium"
            name="corrente"
            checked={user.corrente}
            onChange={handleChange}
            inputProps={{ "aria-label": "Controllo corrente" }}
            sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
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
            inputProps={{ "aria-label": "Controllo abilitato" }}
            sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styled.invia}
          sx={{ marginTop: "30px", color: "white", borderColor: "white" }}
        >
          Salva
        </Button>

        <Button
          variant="outlined"
          color="error"
          className={styled.invia}
          sx={{ marginTop: '30px', marginLeft: '10px' }}
          onClick={handleDelete}
        >
          Elimina
        </Button>
      </form>
    </>
  );
}
