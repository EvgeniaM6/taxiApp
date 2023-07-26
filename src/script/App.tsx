import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Layout } from 'antd';
import { Welcome, Main, ErrorPage, Authorization } from './pages';
import { HeaderElem } from './components';
import { primaryAppColor } from '../constants';

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
            colorPrimary: primaryAppColor,
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
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
};
