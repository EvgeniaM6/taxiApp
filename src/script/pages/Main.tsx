import { Typography } from 'antd';
import { FormRoute, MapBlock } from '../components';

const { Title } = Typography;

export const Main = () => {
  return (
    <>
      <Title level={2}>Build your route</Title>
      <FormRoute />
      <MapBlock />
    </>
  );
};
