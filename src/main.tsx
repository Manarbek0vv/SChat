import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
import './index.css'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Provider } from 'react-redux';
import { setupStore } from './App/store/index.ts';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDB0vzZs8RfqHEZu7fY39sJmnSnp0xi_dE",
  authDomain: "manarbek0v-social-network.firebaseapp.com",
  databaseURL: "https://manarbek0v-social-network-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "manarbek0v-social-network",
  storageBucket: "gs://manarbek0v-social-network.appspot.com",
  messagingSenderId: "1091653592235",
  appId: "1:1091653592235:web:6fac74d1f571d897a003ee",
  measurementId: "G-GVPWBHHYL3"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const database = getDatabase(app)
export const storage = getStorage(app)

export const imagesRef = ref(storage, 'images')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={setupStore()}>
    <App />
  </Provider>
)