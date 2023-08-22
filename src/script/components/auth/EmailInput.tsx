import { MailOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const { Item } = Form;

export const EmailInput = () => {
  const { t } = useTranslation();

  return (
    <Item
      label={t('labelEmail')}
      name="email"
      rules={[{ required: true, message: t('errMessageEmail'), type: 'email' }]}
    >
      <Input prefix={<MailOutlined />} placeholder="example@mail.ua" allowClear />
    </Item>
  );
};
