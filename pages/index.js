import Head from "next/head";
import MediaCard from "@/components/Card";
import styled from "@/styles/Home.module.css";
import ResponsiveAppBar from "@/components/Navbar"
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page({ data }) {
  return (
    <div>
      <Head>
        <title>Your Title Here</title>
        {/* Altri elementi head se necessario */}
      </Head>
      <main className={styled.main}>
        <ResponsiveAppBar />
        <MediaCard data={data} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetcher('https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app/cards/.json');
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await res.json();
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
