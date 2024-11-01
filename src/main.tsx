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
