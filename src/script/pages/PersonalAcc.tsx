import { getDatabase, onValue, ref } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import { TUpdatedUserTrips } from '../models';
import { TripsData } from '../components';

export const PersonalAcc = () => {
  const [userTrips, setUserTrips] = useState<TUpdatedUserTrips | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const db = getDatabase();
  const [user] = useAuthState(auth);
  const reference = ref(db, `users/clients/${user?.uid}/trips`);

  useEffect(() => {
    setIsLoading(true);
    onValue(reference, (snapshot) => {
      const val = snapshot.val();
      setUserTrips(val);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <TripsData userTrips={userTrips} isLoading={isLoading} />
    </>
  );
};
