import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: `${import.meta.env.FIREBASE_API}`,
  authDomain: "childcare-system-f2214.firebaseapp.com",
  projectId: "childcare-system-f2214",
  storageBucket: "childcare-system-f2214.appspot.com",
  messagingSenderId: "740097190528",
  appId: "1:740097190528:web:d36f775d82bdb10bd39465"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)