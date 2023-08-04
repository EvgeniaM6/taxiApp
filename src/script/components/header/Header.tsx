import { useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { navLinksArr } from './navLinksArr';
import { Logo } from '../Logo';

export const HeaderElem = () => {
  const location = useLocation();

  const keyFromPathName = location.pathname.split('/')[1];
  const [navKeyFromPathName, setNavKeyFromPathName] = useState(keyFromPathName || 'home');

  useEffect(() => {
    const newNavKeyFromPathName = location.pathname.split('/')[1] || 'home';
    setNavKeyFromPathName(newNavKeyFromPathName);
  }, [location]);

  return (
    <>
      <Logo />
      <Menu
        mode="horizontal"
        // theme="dark"
        items={navLinksArr}
        selectedKeys={[navKeyFromPathName]}
        style={{ justifyContent: 'flex-end' }}
      />
    </>
  );
};
