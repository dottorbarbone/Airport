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

export default function NewAirplanes() {
  const [user, setUser] = useState({
    capitano: "",
    copilota: "",
    passeggeri: "",
    pesopasseggeri: "",
    bagagli: "",
    posti: "",
    assistentivolo: "",
    luogodecollo: "",
    pistadecollo: "",
    luogoatterraggio: "",
    pistaatterraggio: "",
    serialeaereo: "",
    compagniaaereo: "",
    distanza: "",
    litri: 0, // Aggiungi campo litri
    litriperkm: 0.7, // Aggiungi campo litriperkm con valore di default
    partito: false,
    arrivato: false,
    cancellato: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    // Calcola litri se distanza o litriperkm cambiano
    let updatedUser = { ...user, [name]: newValue };
    if (name === 'distanza' || name === 'litriperkm') {
      const distanza = parseFloat(name === 'distanza' ? newValue : user.distanza);
      const litriperkm = parseFloat(name === 'litriperkm' ? newValue : user.litriperkm);
      if (!isNaN(distanza) && !isNaN(litriperkm)) {
        updatedUser.litri = distanza * litriperkm;
      } else {
        updatedUser.litri = 0;
      }
    }

    setUser(updatedUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      capitano, copilota, passeggeri, pesopasseggeri, bagagli, posti,
      assistentivolo, luogodecollo, pistadecollo, luogoatterraggio,
      pistaatterraggio, serialeaereo, compagniaaereo, distanza, litri,
      partito, arrivato, cancellato
    } = user;
    try {
      // Aggiungi una nuova card al database Firebase
      const NewFliesRef = await push(ref(database, 'flies'), {
        capitano, copilota, passeggeri, pesopasseggeri, bagagli, posti,
        assistentivolo, luogodecollo, pistadecollo, luogoatterraggio,
        pistaatterraggio, serialeaereo, compagniaaereo, distanza, litri,
        partito, arrivato, cancellato
      });
      alert("Dati salvati nel database");
    } catch (error) {
      console.error("Si è verificato un errore durante il salvataggio dei dati:", error);
      alert("Si sono verificati problemi durante il salvataggio dei dati");
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Typography variant="h4" sx={{ marginLeft: "10%", marginTop: "30px" }}>
        Aggiungi un nuovo Aereo
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
        /><br/><br/>
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
        <br/><br/>
        <Typography variant="h5">N. Passeggieri</Typography>
        <TextField
          fullWidth
          type="number"
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
        <br/><br/>
        <Typography variant="h5">Peso Passeggeri</Typography>
        <TextField
          fullWidth
          type="number"
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
        <br/><br/>
        <Typography variant="h5">Peso Bagagli</Typography>
        <TextField
          fullWidth
          type="number"
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
        <br/><br/>
        <Typography variant="h5">Posti Aeroplano</Typography>
        <TextField
          fullWidth
          defaultValue={110}
          type="number"
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
        <br/><br/>
        <Typography variant="h5">Posti Occupati</Typography>
        <TextField
          fullWidth
          type="number"
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
        <br/><br/>
        <Typography variant="h5">Assistenti di Volo</Typography>
        <TextField
          fullWidth
          type="number"
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
        <br/><br/>
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
        <br/><br/>
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
        <br/><br/>
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
        <br/><br/>
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
        <br/><br/>
        <Typography variant="h5">Distanza </Typography>
        <TextField
          fullWidth
          type="number"
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
        <br/><br/>
        <Typography variant="h5">Litri per km</Typography>
        <TextField
          fullWidth
          type="number"
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
        <br/><br/>
        <Typography variant="h5">Litri necessari per compiere la tratta in sicurezza (calcolati automaticamente) </Typography>
        <TextField
          fullWidth
          type="number"
          name="litri"
          value={user.litri}
          onChange={handleChange}
          required
           sx={{
            '& .MuiInputBase-input': {
              color: 'lime'
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
          disabled
        />
        <br/><br/>
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
        <br/><br/>
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
        <br/><br/>
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
          Inserisci
        </Button>
      </form>
    </>
  );
}
