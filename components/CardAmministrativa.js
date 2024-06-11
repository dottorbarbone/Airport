import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Link from "next/link";
export default function CardAmministrativa({ card }) {
  return (
    <Card
      sx={{
        width: "300px",
        minHeight: "360px",
        textAlign: "center",
        paddingBottom: "10px",
      }}
    >
      {card.schermo == true && (
        <Alert variant="outlined" severity="primary">
          Presente in Vetrina
        </Alert>
      )}
      <CardMedia
        sx={{ height: 170 }}
        image={card.immagine}
        title={card.immagine}
      />
      <br />
      {card.amministrativa == true && (
        <Link href="/amministrativa">
          <Button variant="contained" color="secondary">
            Amministrativa
          </Button>
        </Link>
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
        {card.completato == true ? (
          <>
            <Button
              size="medium"
              color="success"
              variant="outlined"
              disabled
              sx={{ width: "100px" }}
            >
              Complete
            </Button>
            &emsp;
          </>
        ) : (
          <>
            <Button
              size="medium"
              color="success"
              variant="contained"
              sx={{ width: "100px" }}
            >
              Complete
            </Button>
            &emsp;
          </>
        )}
        <Button
          size="medium"
          color="warning"
          variant="contained"
          sx={{ width: "100px" }}
        >
          Edit
        </Button>
      </center>
    </Card>
  );
}
