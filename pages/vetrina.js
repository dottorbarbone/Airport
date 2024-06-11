import Head from "next/head";
import MediaCard from "@/components/Card";
import styled from "@/styles/Home.module.css";
import ResponsiveAppBar from "@/components/Navbar";
import SwiperCarousel from "@/components/SwiperCarousel";
import { Typography, Button } from "@mui/material"; // Corretto l'import
import Link from "next/link";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export default function Page({ data }) {
  return (
    <div>
      <Head>
        <title>Your Title Here</title>
        {/* Altri elementi head se necessario */}
      </Head>
      <main className={styled.main}>
        <ResponsiveAppBar />
        <div style={{display:'flex'}}>
          <Typography variant="h5" sx={{ marginTop: "0px", marginRight: "20px", color: 'white' }}>
            Commesse Aeroportuali:
          </Typography>
          <Link href="/NewCard">
            <Button variant="outlined">Add</Button>
          </Link>
        </div>
        
        <br />
        <SwiperCarousel data={data} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const data = await fetcher('https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app/cards.json');

    console.log(JSON.stringify(data, null, 4));

    if (!data) {
      throw new Error('Failed to fetch data');
    }

    console.log('Dati ricevuti:', data); // Stampiamo i dati ricevuti

    return {
      props: { data },
    };

  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: { data: null }, // o un valore predefinito in caso di errore
    };
  }
}
