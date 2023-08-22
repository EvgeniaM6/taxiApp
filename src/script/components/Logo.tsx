import { Typography } from 'antd';
import { NavLink } from 'react-router-dom';

const { Title } = Typography;

export const Logo = () => {
  return (
    <NavLink to="/" className="header__link" style={{ display: 'flex', alignItems: 'center' }}>
      <Title className="logo" style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>
        <span className="logo-first">Taxi</span>
        <span className="logo-second">Koll</span>
      </Title>
    </NavLink>
  );
};
