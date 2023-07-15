import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';

const navLinksArr = [
  {
    label: (
      <NavLink to="/" className="header__link">
        Home
      </NavLink>
    ),
    key: 'home',
  },
  {
    label: (
      <NavLink to="/route" className="header__link">
        Taxi
      </NavLink>
    ),
    key: 'route',
  },
];

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
      <Menu
        mode="horizontal"
        theme="dark"
        items={navLinksArr}
        selectedKeys={[navKeyFromPathName]}
      />
    </>
  );
};
