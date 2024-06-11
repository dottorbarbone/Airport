import ResponsiveAppBar from "@/components/Navbar";
import { Button } from "@mui/material";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import AirplanesCard from "@/components/AirplanesCard";

// Preparazione fetcher api...
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Airplanes({ flies }) {
  // Convertire l'oggetto flies in un array
  const fliesArray = flies ? Object.keys(flies).map(key => ({ id: key, ...flies[key] })) : [];

  return (
    <>
      <ResponsiveAppBar />
      <div className="container" style={{ marginLeft: '8%', marginRight: '8%' }}>
        <div className="container" style={{ display: 'flex' }}>
          <Typography variant="h5" sx={{ marginTop: "0px", marginRight: "20px", color: 'white' }}>
            Voli programmati per oggi:
          </Typography>
          <Link href="/NewAirplanes">
            <Button sx={{ marginTop: "2px" }} color="primary" variant="outlined">
              Nuovo Volo
            </Button>
          </Link>
        </div>
        <br /><br />
        <Typography sx={{ color: 'grey' }} variant="h2">Private Jet Airport:</Typography>
        <br/><br/>
        <AirplanesCard flies={fliesArray} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const flies = await fetcher('https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app/flies/.json');
    console.log(JSON.stringify(flies, null, 4));

    if (!flies) {
      throw new Error('Failed to fetch flies');
    }

    console.log('Dati ricevuti:', flies); // Stampiamo i dati ricevuti

    return {
      props: { flies }, // Restituiamo i dati come props
    };

  } catch (error) {
    console.error('Error fetching flies:', error.message);
    return {
      props: { flies: null }, // o un valore predefinito in caso di errore
    };
  }
}
