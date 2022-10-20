import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCrR6BI0jjJa-q9Y4d0mxbUzz2KMLHXf4o',
  authDomain: 'gamezone-a16ab.firebaseapp.com',
  projectId: 'gamezone-a16ab',
  storageBucket: 'gamezone-a16ab.appspot.com',
  messagingSenderId: '202605803313',
  appId: '1:202605803313:web:cb2f1ea708a73f3feb2210',
  measurementId: 'G-P8MTNSRDN0',
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
