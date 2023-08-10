import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAqUOLjQ1n8G07cd2dFkfW120VnfffMOWQ',
  authDomain: 'taxiapp-b028f.firebaseapp.com',
  projectId: 'taxiapp-b028f',
  storageBucket: 'taxiapp-b028f.appspot.com',
  messagingSenderId: '776995539844',
  appId: '1:776995539844:web:63a0115fb5cfe0dec0abd1',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const logOut = () => {
  signOut(auth);
};
