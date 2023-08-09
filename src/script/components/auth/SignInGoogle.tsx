import { Button } from 'antd';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';

export const SignInGoogle = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        console.log('token=', token);
      }
      // The signed-in user info.
      const user = result.user;
      console.log('user=', user);
      // IdP data available using getAdditionalUserInfo(result)
    });
  };

  return (
    <Button type="default" onClick={signInWithGoogle}>
      Sign In with Google
    </Button>
  );
};
