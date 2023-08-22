import { Alert, Button, Form, Space } from 'antd';
import { ISignUpFormValues } from '../../models';
import { useState } from 'react';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth, createNewUser } from '../../firebase';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { RepeatPasswordInput } from './RepeatPasswordInput';
import { PhoneInput } from './PhoneInput';
import { NameInput } from './NameInput';
import { useTranslation } from 'react-i18next';
const { Item } = Form;

export const SignUp = () => {
  const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);
  const [isWrongRegistration, setIsWrongRegistration] = useState(false);
  const [formElem] = Form.useForm();
  const { t } = useTranslation();

  const submitSignUp = (values: ISignUpFormValues): void => {
    setIsSuccessRegistration(false);
    setIsWrongRegistration(false);
    const { email, password, phone, prefix, name } = values;

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials: UserCredential) => {
        formElem.resetFields();
        sendEmailVerification(credentials.user);
        setIsSuccessRegistration(true);

        createNewUser({ userId: credentials.user.uid, email, name, phone: `${prefix}${phone}` });
      })
      .catch((err) => {
        if (err.message.includes('email-already-in-use')) {
          setIsWrongRegistration(true);
        }
      });
  };

  return (
    <Form
      initialValues={{ prefix: '38' }}
      form={formElem}
      labelWrap
      labelCol={{ span: 2 }}
      wrapperCol={{ xs: { span: 16 }, lg: { span: 8 } }}
      onFinish={submitSignUp}
    >
      <EmailInput />
      <PasswordInput />
      <RepeatPasswordInput />
      <NameInput />
      <PhoneInput />
      <Item wrapperCol={{ offset: 2 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            {t('btnSignUp')}
          </Button>
        </Space>
      </Item>
      {isSuccessRegistration && (
        <Alert showIcon message={t('successRegistrationMessage')} type="success" closable />
      )}
      {isWrongRegistration && (
        <Alert showIcon message={t('errMessageEmailWasRegistered')} type="error" closable />
      )}
    </Form>
  );
};
