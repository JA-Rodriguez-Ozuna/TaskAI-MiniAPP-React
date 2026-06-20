import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDkkDKZpf6JuY2QklKPqilhfNPkMCuGEwE",
  authDomain: "taskai-app-5f0b1.firebaseapp.com",
  projectId: "taskai-app-5f0b1",
  storageBucket: "taskai-app-5f0b1.firebasestorage.app",
  messagingSenderId: "210530829072",
  appId: "1:210530829072:web:eb7c79b5753a3157ff9b95"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
