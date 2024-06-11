import React from "react";
import {
  Container,
  Typography,
  Alert,
  Badge,
  Box,
  Button,
  Chip,
  Link,
  Avatar
} from "@mui/material";
import { Rating } from "@mui/material";

export default function WorkerCard({ cardd }) {
  console.log("Dati del cardd ricevuti in WorkerCard:", cardd);

  if (!cardd) {
    return <Alert severity="error">Dati del lavoratore non disponibili!</Alert>;
  }

  if (cardd.abilitato !== true) {
    return (
      <Alert severity="warning" sx={{ width: "100%", marginTop:'10px' }}>
        {cardd.nome} non sta lavorando al momento!<br/>
        <Link href={`/updateworker/${cardd.id}`} passHref>
          <Button color="warning" variant="contained">Modifica</Button>
        </Link>
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "auto",
        padding: "16px",
        borderRadius: "10px",
        border: "1px solid grey",
        marginBottom: "16px",
        marginTop: "10px",
        margin:'10px'
      }}> 
      <div style={{display:"flex"}}>
      <Avatar alt={cardd.nome} src={cardd.immagineprofilo} /> &emsp; 
      <Chip sx={{ textAlign: 'center', alignContent: 'center', alignItems: 'center' }} label={cardd.reparto} color="success" />
      </div>
      
      <br />
      <Box sx={{ display: "flex" }}>
      <Link href={`/updateworker/${cardd.id}`} passHref>
        <Button variant="contained" >
          {cardd.nome}
        </Button>
      </Link>
        &emsp;
        <Button variant="contained">{cardd.cognome}</Button>
      </Box>
      <br />
      <Typography variant="body1" sx={{color:'white'}}>Età: {cardd.età} </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography variant="body1" sx={{color:'bisque'}}>Esperienza:</Typography>
        <Rating precision={0.5} value={cardd.esperienza} readOnly />
      </Box>
    </Box>
  );
}
