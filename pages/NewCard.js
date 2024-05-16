import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "@/components/Navbar";
import styled from "@/styles/form.module.css";
import TextField from "@mui/material/TextField";
export default function NewCard() {
    const[user, setUser]= useState(
        {
            titolo:'',
            descrizione:'',
            immagine:''
        }
    )
    let name, value
    console.log(user)
    const data = (e) =>
        {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]: value});
    }
    const getdata = async (e) =>
        {
           const {titolo, descrizione, immagine} = user;
            e.preventDefault();
            const options = {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(
                    {
                     titolo, descrizione, immagine
                    }
                )
            }
            const res = await fetch('https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app/cards.json', options)
            console.log(res)
            if(res){
                alert('Data Stored In database')
            }    
            else(
                alert('Problemiiiii, problemiiiiii')
            )
        }   
  return (
    <>
      <ResponsiveAppBar />
      <Typography variant="h4" sx={{ marginLeft: "10%", marginTop: "30px" }}>
        Crea una Nuova Card visibile allo staff dell'aeroporto.
      </Typography>
      <form className={styled.form} method="POST">
        <Typography variant="h5">Titolo</Typography>
        <TextField fullWidth type="text" name='titolo' value={user.titolo} onChange={data} required />
        <Typography variant="h5">Descrizione</Typography>
        <TextField fullWidth type="text" name="descrizione" value={user.descrizione} onChange={data} required />
        <Typography variant="h5">Immagine</Typography>
        <TextField fullWidth type="text" name="immagine" value={user.immagine} onChange={data} required />
        <Button type="submit" variant="contained" className={styled.invia} onClick={getdata}>
          Inserisci
        </Button>
      </form>
    </>
  );
}
