import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({card}) {
  return (
    <Card sx={{ width:'300px', height:'360px', textAlign:'center'}}>
      <CardMedia
        sx={{ height: 170 }}
        image={card.immagine}
        title={card.immagine}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.titolo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.descrizione}
        </Typography>
      </CardContent>
        <center>
          <Button size="medium" color='success' variant='contained' sx={{width:'100px'}}>View</Button>
        </center>
    </Card>
  );
}
