import Head from "next/head";
import MediaCard from "@/components/Card";
import styled from "@/styles/Home.module.css";
import ResponsiveAppBar from "@/components/Navbar";
import SwiperCarousel from "@/components/SwiperCarousel";
import { Container, Typography, Link, Button } from "@mui/material";
import WorkerCarousel from "@/components/WorkerCarousel";
import ShopCarousel from "@/components/ShopCarousel";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page({ data, worker, shop }) {
  return (
    <div>
      <Head>
        <title>Your Title Here</title>
        {/* Altri elementi head se necessario */}
      </Head>
      <main className={styled.main}>
        <ResponsiveAppBar />
        <Container sx={{ marginLeft: '5%', minWidth: '90%', padding: '0px' }}>
          <center>
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src="https://www.webuildvalue.com/wp-content/uploads/2022/02/nuovo-aeroporto-sydney.jpg"
              alt="Example Map"
              style={{  
              width:' 100%', /* Larghezza desiderata */
              height: '70vh', /* Altezza desiderata */
              clipPath:'inset(10% 0% 0% 0%)', /* Taglia l'immagine dal 10% dei bordi */
              objectFit: 'cover' /* Assicura che l'immagine riempia l'area */}}
            />
            <Link href="/vetrina">
              <Button
                variant="contained"
                sx={{
                  position: 'absolute',
                  top: '70%', // Cambia questo valore per posizionare verticalmente
                  left: '50%', // Cambia questo valore per posizionare orizzontalmente
                  transform: 'translate(-50%, -50%)',
                }}
              >
                Commesse Aeroportuali
              </Button>
            </Link>
            <Link href="/Shop">
              <Button
                variant="contained"
                sx={{
                  position: 'absolute',
                  top: '40%', // Cambia questo valore per posizionare verticalmente
                  left: '75%', // Cambia questo valore per posizionare orizzontalmente
                  transform: 'translate(-50%, -50%)',
                }}
              >
                Negozi              
            </Button>
            </Link>
            <Link href="/Worker">
              <Button
                variant="contained"
                sx={{
                  position: 'absolute',
                  top: '90%', // Cambia questo valore per posizionare verticalmente
                  left: '85%', // Cambia questo valore per posizionare orizzontalmente
                  transform: 'translate(-50%, -50%)',
                }}
              >
                Lavoratori             
            </Button>
            </Link>
            <Link href="/airplanes">
              <Button
                variant="contained"
                sx={{
                  position: 'absolute',
                  top: '49%', // Cambia questo valore per posizionare verticalmente
                  left: '40%', // Cambia questo valore per posizionare orizzontalmente
                  transform: 'translate(-50%, -50%)',
                }}
              >
                Voli programmati             
            </Button>
            </Link>
          </div>
          </center>
        <br/><br/><br/>
          <div className="container" style={{ display: "flex" }}>

            <Typography variant="h5" sx={{ marginTop: "0px", marginRight: "20px", color: 'white' }}>
              Commesse Aeroportuali:
            </Typography>
            <Link href="/NewCard">
              <Button variant="outlined">Add</Button>
            </Link>
          </div>
          <br/>
          <SwiperCarousel data={data} />
          <br /><br /><br />

          <br /><br /><br />
          <div className="container" style={{ display: "flex" }}>
            <Typography variant="h5" sx={{ marginTop: "0px", marginRight: "20px", color: 'coral' }}>
              Dipendenti al lavoro
            </Typography>
            <Link href="/NewWorker">
              <Button variant="outlined">Add</Button>
            </Link>
          </div>
          <WorkerCarousel worker={worker} />
          <br /><br /><br />
          <div className="container" style={{ display: "flex" }}>
            <Typography variant="h5" sx={{ marginTop: "0px", marginRight: "20px", color: 'yellow' }}>
              Negozi Aeroporto
            </Typography>
            <Link href="/NewShop">
              <Button variant="outlined">Add</Button>
            </Link>
          </div>
          <ShopCarousel shop={shop} />
        </Container>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const data = await fetcher('https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app/cards/.json');
    const worker = await fetcher('https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app/worker/.json');
    const shop = await fetcher('https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app/shop/.json');
    
    console.log('Dati ricevuti:',shop);

    return {
      props: { data, worker, shop },
    };
    
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: { data: null, worker: null, shop: null }, // o un valore predefinito in caso di errore
    };
  }
}
