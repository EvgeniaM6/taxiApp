import { UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const { Item } = Form;

export const NameInput = () => {
  const { t } = useTranslation();

  return (
    <Item
      name="name"
      label={t('labelName')}
      rules={[
        {
          required: true,
          message: t('errMessageName'),
        },
        {
          message: t('errMessageWrongName'),
          pattern: /^[A-Z,А-Я,a-z,а-я]{1,35}$/,
          min: 1,
          max: 35,
        },
      ]}
      tooltip={t('tooltipName')}
    >
      <Input
        prefix={<UserOutlined />}
        allowClear
        placeholder={t('placeholderName')}
        style={{ width: '100%' }}
      />
    </Item>
  );
};
