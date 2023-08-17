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
      navigate('/');
      const { user } = result;
      dispatch(setUserId(user.uid));
    });
  };

  return (
    <Button icon={<GoogleOutlined />} type="default" onClick={signInWithGoogle}>
      Sign In with Google
    </Button>
  );
};
