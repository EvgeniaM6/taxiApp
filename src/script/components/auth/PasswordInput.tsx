import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

const { Item } = Form;

export const PasswordInput = () => {
  return (
    <Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password',
        },
        {
          message: 'Password must be longer than 6 symbols',
          min: 6,
        },
        {
          message: 'Password must contain letters, degits and symbols',
          pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*_+-])(?=.*[a-zA-Z]).{6,}$/,
        },
      ]}
    >
      <Input.Password prefix={<LockOutlined />} placeholder="example1*" allowClear />
    </Item>
  );
};
