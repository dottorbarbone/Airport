import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import { Skeleton } from "@mui/material";

export default function MediaCard({ card }) {
  return (
    card ? (
      <Card
        sx={{
          width: "300px",
          minHeight: "360px",
          textAlign: "center",
          paddingBottom: "10px",
        }}
      >
        {card.schermo === true && (
          <Alert variant="outlined" severity="info">
            Presente in Vetrina
          </Alert>
        )}
        <CardMedia
          sx={{ height: 170 }}
          image={card.immagine}
          title={card.immagine}
        />
        <br />
        {card.amministrativa === true && (
            <Button variant="contained" color="secondary">
              Amministrativa
            </Button>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card.titolo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card.descrizione}
          </Typography>
        </CardContent>
        <br />
        <center>
          {card.completato === true && (
            <>
              <Button
                size="medium"
                color="success"
                variant="outlined"
                sx={{ width: "100px" }}
              >
                Completato
              </Button>
              &emsp;
            </>
          )}
          {card.id ? (
            <Link href={`/updatecard/${card.id}`} passHref>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                sx={{ width: "100px" }}
              >
                Modifica
              </Button>
            </Link>
          ) : (
            <Button
              size="medium"
              color="primary"
              variant="contained"
              sx={{ width: "100px" }}
              disabled
            >
              Modifica
            </Button>
          )}
        </center>
      </Card>
    ) : (
      <Skeleton variant="rectangular" width={300} height={360} />
    )
  );
}
