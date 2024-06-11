import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "@/components/Navbar";
import styled from "@/styles/form.module.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, remove } from "firebase/database";

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

export default function UpdateAirplane() {
  const router = useRouter();
  const { id } = router.query; // Ottiene l'ID dalla query string
  const [user, setUser] = useState({
    capitano: "",
    copilota: "",
    passeggeri: "",
    pesopasseggeri: "",
    bagagli: "",
    posti: "110",
    assistentivolo: "",
    luogodecollo: "",
    pistadecollo: "",
    luogoatterraggio: "",
    pistaatterraggio: "",
    serialeaereo: "",
    compagniaaereo: "",
    distanza: "",
    litri: 0, // Campo litri aggiunto
    litriperkm:0, // Campo litriperkm aggiunto con valore di default
    partito: false,
    arrivato: false,
    cancellato: false
  });

  useEffect(() => {
    if (id) {
      // Recupera i dati dell'aereo corrispondente all'ID
      const fetchAirplaneData = async () => {
        try {
          const airplaneRef = ref(database, `flies/${id}`);
          const snapshot = await get(airplaneRef);
          if (snapshot.exists()) {
            setUser(snapshot.val());
          } else {
            console.error("No data available");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchAirplaneData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
  
    // Converti il valore in numero decimale se è un campo numerico
    if (type === 'text' && (name === 'passeggeri' || name === 'pesopasseggeri' || name === 'bagagli' || name === 'posti' || name === 'assistentivolo' || name === 'distanza')) {
      newValue = newValue.replace(",", ".");
      newValue = parseFloat(newValue);
    }
  
    // Calcola litri se distanza o litriperkm cambiano
    let updatedUser = { ...user, [name]: newValue };
    if (name === 'distanza' || name === 'litriperkm') {
      const distanza = (name === 'distanza' ? newValue : user.distanza);
      const litriperkm = (name === 'litriperkm' ? newValue : user.litriperkm);
      if (!isNaN(distanza) && !isNaN(litriperkm)) {
        updatedUser.litri = distanza * litriperkm;
      } else {
        updatedUser.litri = 0;
      }
    } else if (name === 'litri') {
      newValue = newValue.replace(",", ".");
      updatedUser = { ...user, [name]: parseFloat(newValue) };
    }
  
    setUser(updatedUser);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { capitano, copilota, passeggeri, pesopasseggeri, bagagli, posti, assistentivolo, luogodecollo, pistadecollo, luogoatterraggio, pistaatterraggio, serialeaereo, compagniaaereo, distanza, litri, litriperkm, partito, arrivato, cancellato } = user;
    try {
      // Aggiorna l'aereo nel database Firebase
      await set(ref(database, `flies/${id}`), {
        capitano, copilota, passeggeri, pesopasseggeri, bagagli, posti, assistentivolo, luogodecollo, pistadecollo, luogoatterraggio, pistaatterraggio, serialeaereo, compagniaaereo, distanza, litri, litriperkm, partito, arrivato, cancellato
      });
      alert("Dati aggiornati nel database");
      router.push('/airplanes');
    } catch (error) {
      console.error("Si è verificato un errore durante l'aggiornamento dei dati:", error);
      alert("Si sono verificati problemi durante l'aggiornamento dei dati");
    }
  };

  const handleDelete = async () => {
    try {
      const cardRef = ref(database, `flies/${id}`);
      await remove(cardRef);
      console.log("volo eliminato con successo");
      alert("volo eliminato con successo");
      router.push('/'); // Reindirizza l'utente dopo l'eliminazione
    } catch (error) {
      console.error("Errore durante l'eliminazione del volo:", error);
      alert("Si sono verificati problemi durante l'eliminazione del volo");
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Typography variant="h4" sx={{ marginLeft: "10%", marginTop: "30px" }}>
        {id ? "Modifica volo:" : "Aggiungi un nuovo Aereo"}
      </Typography>
      <form className={styled.form} onSubmit={handleSubmit}>
        <Typography variant="h5">Capitano</Typography>
        <TextField
          fullWidth
          type="text"
          name="capitano"
          value={user.capitano}
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
        <Typography variant="h5">Copilota</Typography>
        <TextField
          fullWidth
          type="text"
          name="copilota"
          value={user.copilota}
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
        />
        <br /><br />
        <Typography variant="h5">N. Passeggeri</Typography>
        <TextField
          fullWidth
          type="text"
          name="passeggeri"
          value={user.passeggeri}
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
        
        />
        <br /><br />
        <Typography variant="h5">Peso Passeggeri</Typography>
        <TextField
          fullWidth
          type="text"
          name="pesopasseggeri"
          value={user.pesopasseggeri}
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
         
        />
        <br /><br />
        <Typography variant="h5">Peso Bagagli</Typography>
        <TextField
          fullWidth
          type="text"
          name="bagagli"
          value={user.bagagli}
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
        />
        <br /><br />
        <Typography variant="h5">Posti Aeroplano</Typography>
        <TextField
          fullWidth
          type="text"
          name="posti"
          value={user.posti}
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
        />
        <br /><br />
        <Typography variant="h5">Posti Occupati</Typography>
        <TextField
          fullWidth
          type="text"
          name="postioccupati"
          value={user.passeggeri}
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
        />
        <br /><br />
        <Typography variant="h5">Assistenti di Volo</Typography>
        <TextField
          fullWidth
          type="text"
          name="assistentivolo"
          value={user.assistentivolo}
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
        />
        <br /><br />
        <Typography variant="h5">Luogo Decollo </Typography>
        <TextField
          fullWidth
          type="text"
          name="luogodecollo"
          value={user.luogodecollo}
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
        />
        <br /><br />
        <Typography variant="h5">Pista Decollo </Typography>
        <TextField
          fullWidth
          type="text"
          name="pistadecollo"
          value={user.pistadecollo}
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
        />
        <br /><br />
        <Typography variant="h5">Luogo Atterraggio </Typography>
        <TextField
          fullWidth
          type="text"
          name="luogoatterraggio"
          value={user.luogoatterraggio}
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
        />
        <br /><br />
        <Typography variant="h5">Pista Atterraggio </Typography>
        <TextField
          fullWidth
          type="text"
          name="pistaatterraggio"
          value={user.pistaatterraggio}
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
        />
        <br /><br />
        <Typography variant="h5">Distanza </Typography>
        <TextField
          fullWidth
          type="text"
          name="distanza"
          value={user.distanza}
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
        />
        <br /><br />
        <Typography variant="h5">Litri per km</Typography>
        <TextField
          fullWidth
          type="text"
          name="litriperkm"
          value={user.litriperkm}
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
        />
        <br /><br />
        <Typography variant="h5">Litri necessari per compiere la tratta in sicurezza (calcolati automaticamente) </Typography>
        <TextField
          fullWidth
          type="text"
          name="litri"
          value={user.litri}
          
          sx={{
            '& .MuiInputBase-input': {
              color: 'lime'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'grey',
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
        />
        <br /><br />
        <Typography variant="h5">Numero Seriale Aereo </Typography>
        <TextField
          fullWidth
          type="text"
          name="serialeaereo"
          value={user.serialeaereo}
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
        />
        <br /><br />
        <Typography variant="h5">Compagnia Aerea </Typography>
        <TextField
          fullWidth
          type="text"
          name="compagniaaereo"
          value={user.compagniaaereo}
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
        />
        <br /><br />
        <div style={{ display: 'flex', flexDirection: 'row-reverse', float: 'left', marginTop: '10px' }}>
          <Typography variant="h6" sx={{ marginTop: '4px' }}> Partito </Typography>
          <Checkbox
            id="partito"
            size="medium"
            name="partito"
            checked={user.partito}
            onChange={handleChange}
            inputProps={{ "aria-label": "partito" }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', float: 'left', marginTop: '10px' }}>
          <Typography variant="h6" sx={{ marginTop: '4px' }}> Arrivato </Typography>
          <Checkbox
            id="arrivato"
            size="medium"
            name="arrivato"
            checked={user.arrivato}
            onChange={handleChange}
            inputProps={{ "aria-label": "arrivato" }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', float: 'left', marginTop: '10px' }}>
          <Typography variant="h6" sx={{ marginTop: '4px' }}> Volo Cancellato </Typography>
          <Checkbox
            id="cancellato"
            size="medium"
            name="cancellato"
            checked={user.cancellato}
            onChange={handleChange}
            inputProps={{ "aria-label": "Cancellato" }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styled.invia}
          sx={{ marginTop: '30px' }}
        >
          {id ? "Modifica" : "Inserisci"}
        </Button>
        {id && (
          <Button
            variant="outlined"
            color="error"
            className={styled.invia}
            sx={{ marginTop: '30px', marginLeft: '10px' }}
            onClick={handleDelete}
          >
            Elimina
          </Button>
        )}
      </form>
    </>
  );
}
