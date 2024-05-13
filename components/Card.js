import { MonochromePhotos } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import '@fontsource/roboto/300.css';
export default function MediaCard({ cards }) {
    if (!cards) {
        return <Typography mt={10} gutterBottom variant="h2" fontFamily="Roboto">No data available from <Link href="https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app/" >API</Link></Typography>;
      }
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={cards.immagine}
          title={cards.titolo}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cards.titolo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cards.descrizione}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }
  