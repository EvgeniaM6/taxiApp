import { useState } from 'react';
import { SignIn, SignUp } from '../components/auth';
import { Form, Radio, RadioChangeEvent } from 'antd';

export const Authorization = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const chooseAuth = (e: RadioChangeEvent): void => {
    setIsSignIn(e.target.value === 'signIn');
  };

  return (
    <>
      <Form style={{ paddingBottom: 24 }}>
        <Radio.Group onChange={chooseAuth} defaultValue={isSignIn ? 'signIn' : 'signUp'}>
          <Radio.Button value="signIn" key="signIn">
            Sign In
          </Radio.Button>
          <Radio.Button value="signUp" key="signUp">
            Sign Up
          </Radio.Button>
        </Radio.Group>
      </Form>
      {isSignIn ? <SignIn /> : <SignUp />}
    </>
  );
};
