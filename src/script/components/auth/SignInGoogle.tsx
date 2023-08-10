import { Button } from 'antd';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../hooks';
import { setUserId } from '../../store/authSlice';

export const SignInGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      const { user } = result;
      console.log('user=', user);
      dispatch(setUserId(user.uid));
      // IdP data available using getAdditionalUserInfo(result)
    });
  };

  return (
    <Button icon={<GoogleOutlined />} type="default" onClick={signInWithGoogle}>
      Sign In with Google
    </Button>
  );
};
