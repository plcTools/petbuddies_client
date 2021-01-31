import firebase from 'firebase';
import { FIREBASE_KEY,
FIREBASE_AUTH_DOMAIN,
FIREBASE_PROYECT_ID,
FIREBASE_STORAGE_BUCKET,
FIREBASE_MESSAGING_SENDER_ID,
FIREBASE_APP_ID } from '@env';


const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROYECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID
  };


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();