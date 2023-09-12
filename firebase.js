import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getApp, getApps} from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAtXsypt_w1h1aAKt42EHxiS4gNWuuIZM0",
    authDomain: "fir-react-4d829.firebaseapp.com",
    projectId: "fir-react-4d829",
    storageBucket: "fir-react-4d829.appspot.com",
    messagingSenderId: "198521101265",
    appId: "1:198521101265:web:d1ab799c6bc27f91f21ef0"
  };

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)