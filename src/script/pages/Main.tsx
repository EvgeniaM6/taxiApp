import { Typography } from 'antd';
import { FormRoute, MapBlock } from '../components';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

export const Main = () => {
  const { t } = useTranslation();

  return (
    <>
      <Title level={2}>{t('mainPageTitle')}</Title>
      <Paragraph>{t('mainPageInstruction')}</Paragraph>
      <FormRoute />
      <MapBlock />
    </>
  );
};
