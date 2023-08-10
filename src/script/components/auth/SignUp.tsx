import { Alert, Button, Form, Space } from 'antd';
import { ISignUpFormValues } from '../../models';
import { ChangeEventHandler, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { RepeatPasswordInput } from './RepeatPasswordInput';
const { Item } = Form;

export const SignUp = () => {
  const [passwordEnetered, setPasswordEnetered] = useState('');
  const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);
  const [isWrongRegistration, setIsWrongRegistration] = useState(false);
  const [formElem] = Form.useForm();

  const submitSignUp = (values: ISignUpFormValues): void => {
    setIsSuccessRegistration(false);
    setIsWrongRegistration(false);
    const { e_mail, password } = values;
    createUserWithEmailAndPassword(auth, e_mail, password)
      .then((dd) => {
        formElem.resetFields();
        sendEmailVerification(dd.user);
        setIsSuccessRegistration(true);
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
      form={formElem}
      labelWrap
      labelCol={{ span: 2 }}
      wrapperCol={{ xs: { span: 16 }, lg: { span: 8 } }}
      onFinish={submitSignUp}
    >
      <EmailInput />
      <PasswordInput changePassword={changeRepeatPasswordValidate} />
      <RepeatPasswordInput passwordEnetered={passwordEnetered} />
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
