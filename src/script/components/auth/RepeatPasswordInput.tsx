import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const { Item } = Form;

export const RepeatPasswordInput = () => {
  const { t } = useTranslation();

  return (
    <Item
      label={t('labelRepeatPassword')}
      name="repeat_password"
      rules={[
        {
          required: true,
          message: t('errMessageRepeatPassword'),
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error(t('errMessagePasswordsNotMatch')));
          },
        }),
      ]}
    >
      <Input.Password placeholder={t('placeholderPassword')} prefix={<LockOutlined />} allowClear />
    </Item>
  );
};
