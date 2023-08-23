import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Layout } from 'antd';
import { Welcome, Main, ErrorPage, Authorization, PersonalAcc } from './pages';
import { FooterElem, HeaderElem } from './components';
import { PRIMARY_APP_COLOR } from '../constants';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { useEffect } from 'react';
import { Footer } from 'antd/es/layout/layout';

const { Header, Content } = Layout;

export const App = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/authorization' && user) {
      navigate('/');
    } else if (location.pathname === '/account' && !user) {
      navigate('/authorization');
    }
  }, [location, user]);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: PRIMARY_APP_COLOR,
          },
        }}
      >
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="header">
            <HeaderElem />
          </Header>
          <Content className="main">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/route" element={<Main />} />
              <Route path="/authorization" element={<Authorization />} />
              <Route path="/account" element={<PersonalAcc />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Content>
          <Footer className="footer">
            <FooterElem />
          </Footer>
        </Layout>
      </ConfigProvider>
    </>
  );
};
