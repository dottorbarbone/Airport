import Head from "next/head";
import MediaCard from "@/components/Card";
const featcher = (...args) => fetch(...args).then((res) => res.json)

export default function Cards({data}){
  return(
      <MediaCard data={data}/>   
    )
}

export async function getStaticProps(){
  const data = await featcher('https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app/cards.json')

  return {
    props: {
      data
    }
  }
}