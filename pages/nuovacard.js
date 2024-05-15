// Funzione per effettuare una richiesta POST per inserire una nuova card
async function inserisciCard(cardData) {
    try {
      const response = await fetch('https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app/cards.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });
  
      if (!response.ok) {
        throw new Error('Errore durante l\'inserimento della card');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Errore durante la richiesta POST:', error.message);
      throw error;
    }
  }
  
  // Esempio di utilizzo della funzione per inserire una nuova card
  const nuovaCard = {
    titolo: 'Nuovo',
    descrizione: 'è una nuova card',
    stato: 'In corso',
    immagine: 'url-dell-immagine.jpg',
  };
  
  inserisciCard(nuovaCard)
    .then(data => {
      console.log('Card inserita con successo:', data);
    })
    .catch(error => {
      console.error('Errore durante l\'inserimento della card:', error);
    });
  