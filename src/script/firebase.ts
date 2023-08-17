import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, set, update } from 'firebase/database';
import { TNewUserData, TTripData, TUpdatedUserTrips, TUserData } from './models';

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

export const createNewUser = ({ userId, email, name, phone }: TUserData) => {
  const db = getDatabase();
  const reference = ref(db, `users/clients/${userId}`);

  set(reference, {
    name,
    email,
    phone,
    trips: {},
  });
};

export const updateUserData = (userId: string, key: string, value: string) => {
  const db = getDatabase();
  const reference = ref(db, `users/clients/${userId}`);

  const newValue: TNewUserData = {};
  newValue[key] = value;
  update(reference, newValue);
};

export const addTrip = (userId: string, tripData: TTripData) => {
  const db = getDatabase();
  const reference = ref(db, `users/clients/${userId}/trips`);

  const newValue: TUpdatedUserTrips = {};
  const key = Date.now();
  newValue[key] = tripData;
  update(reference, newValue);
};
