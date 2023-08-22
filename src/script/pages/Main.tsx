import { Typography } from 'antd';
import { FormRoute, MapBlock } from '../components';

const { Title, Paragraph } = Typography;

export const Main = () => (
  <>
    <Title level={2}>Build your route</Title>
    <Paragraph>
      You can build a route by entering addresses in the input boxes or by drawing on the map. To
      place a destination marker on the map, double-click on the map. Also, after building a route,
      you can move the markers around the map by pressing and holding one of them.
    </Paragraph>
    <FormRoute />
    <MapBlock />
  </>
);
