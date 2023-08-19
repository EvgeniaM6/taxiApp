import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Layout } from 'antd';
import { Welcome, Main, ErrorPage, Authorization, PersonalAcc } from './pages';
import { HeaderElem } from './components';
import { PRIMARY_APP_COLOR } from '../constants';

const { Header, Content } = Layout;

const contentStyleObj: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '5px 50px 0',
};

export const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: PRIMARY_APP_COLOR,
          },
        }}
      >
        <Layout>
          <Header className="header">
            <HeaderElem />
          </Header>
          <Content style={contentStyleObj}>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/route" element={<Main />} />
              <Route path="/authorization" element={<Authorization />} />
              <Route path="/account" element={<PersonalAcc />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
};
