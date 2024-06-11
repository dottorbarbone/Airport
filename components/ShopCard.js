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
  Avatar,
} from "@mui/material";
import { Rating } from "@mui/material";

export default function ShopCard({ shop }) {
  console.log("Dati del shop ricevuti in WorkerCard:", shop);

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
        margin: "10px",
      }}
    >
      <div style={{ display: "flex" }}>
        <Avatar alt={shop.immagine} src={shop.immagine} /> &emsp;
        <Chip
          sx={{
            textAlign: "center",
            alignContent: "center",
            alignItems: "center",
          }}
          label={shop.tipologia}
          color="success"
        />
      </div>

      <br />
      <Box sx={{ display: "flex" }}>
        <Link href={`/updateshop/${shop.id}`} passHref>
          <Button variant="contained">{shop.nome}</Button>
        </Link>
      </Box>
      <br />
      <Typography sx={{color:'white'}} variant="body1">
        Insegna: <br />
      </Typography>
      <Typography sx={{color:'white'}} variant="h5">{shop.tabellone}</Typography>
      <br />
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography variant="body1" sx={{color:'bisque'}}>Valutazione:</Typography>
        <Rating precision={0.5} value={shop.valutazione} readOnly />
      </Box>

     {shop.abilitato === 0 && <Button color="danger">Non abilitato</Button>}
     {shop.wifi === 0 && <Button color="danger">Wifi non abilitato</Button>}
     {shop.corrente === 0 && <Button color="danger">Corrente non abilitata</Button>}
    </Box>
  );
}
