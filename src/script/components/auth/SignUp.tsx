import { Alert, Button, Form, Space } from 'antd';
import { ISignUpFormValues } from '../../models';
import { ChangeEventHandler, useState } from 'react';
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
const { Item } = Form;

export const SignUp = () => {
  const [passwordEnetered, setPasswordEnetered] = useState('');
  const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);
  const [isWrongRegistration, setIsWrongRegistration] = useState(false);
  const [formElem] = Form.useForm();

  const submitSignUp = (values: ISignUpFormValues): void => {
    setIsSuccessRegistration(false);
    setIsWrongRegistration(false);
    const { email, password, phone, prefix, name } = values;
    console.log('phone=', phone);
    console.log('prefix=', prefix);

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials: UserCredential) => {
        console.log('credentials=', credentials);
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

  const changeRepeatPasswordValidate: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPasswordEnetered(e.target.value);
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
      <PasswordInput changePassword={changeRepeatPasswordValidate} />
      <RepeatPasswordInput passwordEnetered={passwordEnetered} />
      <NameInput />
      <PhoneInput />
      <Item wrapperCol={{ offset: 2 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Space>
      </Item>
      {isSuccessRegistration && (
        <Alert
          showIcon
          message="Success registration! Check your e-mail to confirm it"
          type="success"
          closable
        />
      )}
      {isWrongRegistration && (
        <Alert showIcon message="This e-mail was registered" type="error" closable />
      )}
    </Form>
  );
};
