import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const { Item } = Form;

export const PasswordInput = () => {
  const { t } = useTranslation();

  return (
    <Item
      label={t('labelPassword')}
      name="password"
      rules={[
        {
          required: true,
          message: t('errMessagePassword'),
        },
        {
          message: t('errMessageShortPassword'),
          min: 6,
        },
        {
          message: t('errMessageUnsecuredPassword'),
          pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*_+-])(?=.*[A-Z,А-Я,a-z,а-я]).{6,}$/,
        },
      ]}
    >
      <Input.Password prefix={<LockOutlined />} placeholder={t('placeholderPassword')} allowClear />
    </Item>
  );
};
