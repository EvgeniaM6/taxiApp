import { Button } from 'antd';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const SignInGoogle = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ 'Cross-Origin-Opener-Policy': 'same-origin-allow-popups' });
    signInWithPopup(auth, provider).then(() => {
      navigate('/');
    });
  };

  return (
    <Button icon={<GoogleOutlined />} type="default" onClick={signInWithGoogle}>
      {t('btnSignInWithGoogle')}
    </Button>
  );
};
