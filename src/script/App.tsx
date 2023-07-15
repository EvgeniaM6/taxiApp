import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Layout } from 'antd';
import { Welcome, Main, ErrorPage } from './pages';
import { HeaderElem } from './components';

const { Header, Content } = Layout;

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
          <Header>
            <HeaderElem />
          </Header>
          <Content>
            <main className="main">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/route" element={<Main />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
};
