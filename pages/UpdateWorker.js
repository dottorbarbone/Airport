import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "@/components/Navbar";
import styled from "@/styles/form.module.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import { Rating, cardMediaClasses } from "@mui/material";
import { getDatabase, ref, set, get, remove } from "firebase/database";

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

export default function UpdateWorker() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState({
    id: "",
    nome: "",
    cognome: "",
    età: "",
    immagineprofilo: "",
    esperienza: 0,
    reparto: "",
    abilitato: false,
  });

  useEffect(() => {
    if (id) {
      const cardRef = ref(database, `worker/${id}`);
      get(cardRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUser({ ...snapshot.val(), id });
          } else {
            console.error("No data available for the specified ID");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setUser({ ...user, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nome,
      cognome,
      età,
      immagineprofilo,
      esperienza,
      reparto,
      abilitato,
    } = user;

    try {
      console.log("Trying to save data:", {
        nome,
        cognome,
        età,
        immagineprofilo,
        esperienza,
        reparto,
        abilitato,
      });

      await set(ref(database, "worker/" + id), {
        nome,
        cognome,
        età,
        immagineprofilo,
        esperienza,
        reparto,
        abilitato,
      });

      console.log("Data saved successfully");
      alert("Dati salvati nel database");
      router.push("/"); // Reindirizza l'utente dopo il salvataggio
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Si sono verificati problemi durante il salvataggio dei dati");
    }
  };

  const handleDelete = async () => {
    try {
      const cardRef = ref(database, `worker/${id}`);
      await remove(cardRef);
      console.log("Worker eliminato con successo");
      alert("Worker eliminato con successo");
      router.push("/"); // Reindirizza l'utente dopo l'eliminazione
    } catch (error) {
      console.error("Errore durante l'eliminazione del worker:", error);
      alert("Si sono verificati problemi durante l'eliminazione del worker");
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Typography
        variant="h4"
        sx={{ marginLeft: "10%", marginTop: "30px", color: "white" }}
      >
        Aggiorna i dati del lavoratore.
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
        <br/><br/>
        <Typography variant="h4">Anteprima immagine:</Typography>
        <br /><br />
        <img src={user.immagineprofilo} style={{borderRadius:'5px', maxWidth:'350px'}}/>
        <br /><br /><br />
        <div style={{ display: "flex " }}>
          <Typography component="legend" sx={{ color: "white" }}>
            Esperienza
          </Typography>
          <Rating
            name="esperienza"
            precision={0.5}
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
            Abilitato
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
          Salva
        </Button>
        <Button
          variant="outlined"
          color="error"
          className={styled.invia}
          sx={{ marginTop: "30px" }}
          onClick={handleDelete}
        >
          Elimina
        </Button>
      </form>
    </>
  );
}
