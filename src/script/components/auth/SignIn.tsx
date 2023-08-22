import { Alert, Button, Form, Input, Space } from 'antd';
import { EmailInput } from './EmailInput';
import { useState } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { ISignInFormValues } from '../../models';
import { SignInGoogle } from './SignInGoogle';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const { Item } = Form;

export const SignIn = () => {
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const [formElem] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const submitSignIn = (values: ISignInFormValues): void => {
    setIsWrongPassword(false);
    setIsUserNotFound(false);
    const { email, password } = values;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        if (err.message.includes('wrong-password')) {
          setIsWrongPassword(true);
        }
        if (err.message.includes('user-not-found')) {
          setIsUserNotFound(true);
        }
      });
  };

  return (
    <Form
      form={formElem}
      labelWrap
      labelCol={{ span: 2 }}
      wrapperCol={{ xs: { span: 16 }, lg: { span: 8 } }}
      onFinish={submitSignIn}
    >
      <EmailInput />
      <Item
        label={t('labelPassword')}
        name="password"
        rules={[
          {
            required: true,
            message: t('errMessagePassword'),
            min: 6,
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={t('placeholderPassword')}
          allowClear
        />
      </Item>
      <Item wrapperCol={{ offset: 2 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            {t('btnSignIn')}
          </Button>
          <SignInGoogle />
        </Space>
      </Item>
      {isWrongPassword && (
        <Alert showIcon message={t('errMessageWrongPassword')} type="error" closable />
      )}
      {isUserNotFound && (
        <Alert showIcon message={t('errMessageUserNotFound')} type="error" closable />
      )}
    </Form>
  );
};
