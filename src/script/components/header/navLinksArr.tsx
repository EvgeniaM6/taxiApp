import { NavLink } from 'react-router-dom';

export const navLinksArr = [
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
        Build a route
      </NavLink>
    ),
    key: 'route',
  },
  {
    label: (
      <NavLink to="/authorization" className="header__link">
        Sign in
      </NavLink>
    ),
    key: 'authorization',
  },
  {
    label: <button className="header__link btn-logout">Log out</button>,
    key: 'signout',
  },
];
