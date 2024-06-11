import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
export default function AirplanesCard({ flies }) {
  const renderButton = (card) => {
    if (card.cancellato) {
      return <Button color='error'>Cancellato</Button>;
    } else if (card.partito) {
      return <Button>Decollato</Button>;
    } else if (card.arrivato) {
      return <Button>Atterrato</Button>;
    } else {
      return(<><br /><br /></>) ;
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {flies.map((card, index) => (
        <Card key={index} sx={{ maxWidth: 345, marginBottom: 2 }}>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Capitano: {card.capitano}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Copilota: {card.copilota}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Peso Passeggeri: {card.pesopasseggeri} kg
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Peso Bagagli: {card.bagagli} kg
            </Typography><br/>
            {
              card.litri ? (
                <Typography variant="body1" color="text.secondary" sx={{color:'limegreen'}}>
                Calcolo litri carburante= {card.litri} 
              </Typography>
              ):(<></>)
            }
          {renderButton(card)} 
          </CardContent>
            <CardActions>
            <Link href={`/updatefly/${card.id}`} passHref>
                <Button sx={{width:'300px'}} variant='contained'color='primary'>View</Button>
              </Link>        
            </CardActions>
        </Card>
      ))}
    </div>
  );
}
