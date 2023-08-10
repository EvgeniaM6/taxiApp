import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { navLinksArr } from './navLinksArr';
import { Logo } from '../Logo';
import { auth, logOut } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SelectEventHandler, SelectInfo } from 'rc-menu/lib/interface';
import { useAppDispatch } from '../../hooks';
import { resetUserId } from '../../store/authSlice';

export const HeaderElem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();

  const keyFromPathName = location.pathname.split('/')[1];
  const [navKeyFromPathName, setNavKeyFromPathName] = useState(keyFromPathName || 'home');

  useEffect(() => {
    const newNavKeyFromPathName = location.pathname.split('/')[1] || 'home';
    setNavKeyFromPathName(newNavKeyFromPathName);
  }, [location]);

  const handleSelectItem: SelectEventHandler = ({ key }: SelectInfo) => {
    if (key !== 'signout') return;
    logOut();
    dispatch(resetUserId());
    navigate('/');
  };

  return (
    <>
      <Logo />
      <Menu
        mode="horizontal"
        // theme="dark"
        items={...navLinksArr.filter((navLink) => {
          if (navLink.key === 'signout' && !user) {
            return false;
          } else if (navLink.key === 'authorization' && user) {
            return false;
          }
          return true;
        })}
        selectedKeys={[navKeyFromPathName]}
        style={{ justifyContent: 'flex-end' }}
        onSelect={handleSelectItem}
      />
    </>
  );
};
