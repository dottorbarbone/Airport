
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCRSKa7KKzz9Ij2HGE95wvrdmdlelCOpPk",
  authDomain: "airport-fa47c.firebaseapp.com",
  databaseURL: "https://airport-fa47c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "airport-fa47c",
  storageBucket: "airport-fa47c.appspot.com",
  messagingSenderId: "678400117579",
  appId: "1:678400117579:web:12f3a1d1fb0f0900c136ce",
  measurementId: "G-T4JEQB42M0"
};
// Inizializza l'app Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
