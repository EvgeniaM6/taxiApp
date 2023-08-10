import { Button } from 'antd';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';

export const SignInGoogle = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ 'Cross-Origin-Opener-Policy': 'same-origin-allow-popups' });
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      navigate('/');
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
    <Button icon={<GoogleOutlined />} type="default" onClick={signInWithGoogle}>
      Sign In with Google
    </Button>
  );
};
