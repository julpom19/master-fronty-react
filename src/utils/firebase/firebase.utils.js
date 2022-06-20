import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyApSB7QRrhcKhE9o9Ek3HfvO5FyhZuMsyc",
  authDomain: "master-fronty.firebaseapp.com",
  projectId: "master-fronty",
  storageBucket: "master-fronty.appspot.com",
  messagingSenderId: "319232582461",
  appId: "1:319232582461:web:40c0059f47470889a75b54",
  measurementId: "G-4SBHZVMXX7"
};

export const initFirebaseApp = () => {
  if(getApps().length === 0) {
    const firebaseApp = initializeApp(firebaseConfig);
    const analytics = getAnalytics(firebaseApp); //TODO: use it
  }
}