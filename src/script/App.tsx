import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Layout } from 'antd';
import { Welcome, Main, ErrorPage, Authorization } from './pages';
import { HeaderElem } from './components';

const { Header, Content } = Layout;

const headerStyleObj: React.CSSProperties = {
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
};

const contentStyleObj: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '0 50px',
};

export const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#523857',
          },
        }}
      >
        <Layout>
          <Header style={headerStyleObj}>
            <HeaderElem />
          </Header>
          <Content style={contentStyleObj}>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/route" element={<Main />} />
              <Route path="/authorization" element={<Authorization />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
};
