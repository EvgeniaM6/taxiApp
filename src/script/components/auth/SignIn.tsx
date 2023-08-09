import { Alert, Button, Form, Input, Space } from 'antd';
import { EmailInput } from './EmailInput';
import { useState } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { ISignInFormValues } from '../../models';
import { SignInGoogle } from './SignInGoogle';
const { Item } = Form;

export const SignIn = () => {
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const [formElem] = Form.useForm();

  const submitSignIn = (values: ISignInFormValues): void => {
    setIsWrongPassword(false);
    setIsUserNotFound(false);
    const { e_mail, password } = values;

    signInWithEmailAndPassword(auth, e_mail, password)
      .then((userCred) => {
        console.log('userCred=', userCred);
      })
      .catch((err) => {
        console.log('err=', err);
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
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password',
            min: 6,
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="example1*" allowClear />
      </Item>
      <Item wrapperCol={{ offset: 2 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
          <SignInGoogle />
        </Space>
      </Item>
      {isWrongPassword && <Alert showIcon message="Wrong password" type="error" closable />}
      {isUserNotFound && <Alert showIcon message="User not found" type="error" closable />}
    </Form>
  );
};
