import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { navLinksArr } from './navLinksArr';
import { Logo } from '../Logo';
import { auth, logOut } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SelectEventHandler, SelectInfo } from 'rc-menu/lib/interface';
import { useTranslation } from 'react-i18next';
import { TNavLinkObj } from '../../models';

export const HeaderElem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  const keyFromPathName = location.pathname.split('/')[1];
  const [navKeyFromPathName, setNavKeyFromPathName] = useState(keyFromPathName || 'home');

  useEffect(() => {
    const newNavKeyFromPathName = location.pathname.split('/')[1] || 'home';
    setNavKeyFromPathName(newNavKeyFromPathName);
  }, [location]);

  const handleSelectItem: SelectEventHandler = ({ key }: SelectInfo) => {
    if (key !== 'signout') return;
    logOut();
    navigate('/');
  };

  return (
    <>
      <Logo />
      <Menu
        mode="horizontal"
        // theme="dark"
        items={...navLinksArr
          .filter((navLink) => {
            if (navLink === 'signout' && !user) {
              return false;
            } else if (navLink === 'authorization' && user) {
              return false;
            } else if (navLink === 'account' && !user) {
              return false;
            }
            return true;
          })
          .map((navLink) => {
            const navLinkObj: TNavLinkObj = { key: navLink };
            const navLinkTitle = t(`${navLink}Page`);
            if (navLink === 'signout') {
              navLinkObj.label = (
                <button className="header__link btn-logout">{navLinkTitle}</button>
              );
            } else {
              navLinkObj.label = (
                <NavLink to={`/${navLink === 'home' ? '' : navLink}`} className="header__link">
                  {navLinkTitle}
                </NavLink>
              );
            }
            return navLinkObj;
          })}
        selectedKeys={[navKeyFromPathName]}
        style={{ justifyContent: 'flex-end' }}
        onSelect={handleSelectItem}
      />
    </>
  );
};
