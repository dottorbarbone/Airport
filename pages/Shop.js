import Head from "next/head";
import MediaCard from "@/components/Card";
import styled from "@/styles/Home.module.css";
import ResponsiveAppBar from "@/components/Navbar";
import SwiperCarousel from "@/components/SwiperCarousel";
import { Container, Typography, Link, Button } from "@mui/material";
import WorkerCarousel from "@/components/WorkerCarousel";
import ShopCarousel from "@/components/ShopCarousel";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Shop({shop }) {
  return (
    <div>
      <Head>
        <title>Your Title Here</title>
        {/* Altri elementi head se necessario */}
      </Head>
      <main className={styled.main}>
        <ResponsiveAppBar />
        <Container sx={{ marginLeft: '5%', minWidth: '90%', padding: '0px' }}>
          
          
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
  const shop = await fetcher('https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app/shop/.json');
    
    console.log('Dati ricevuti:',shop);

    return {
      props: {shop },
    };
    
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {shop: null }, // o un valore predefinito in caso di errore
    };
  }
}
