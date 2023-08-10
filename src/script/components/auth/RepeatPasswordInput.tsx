import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

const { Item } = Form;

export const RepeatPasswordInput = (props: { passwordEnetered: string }) => {
  const { passwordEnetered } = props;

  return (
    <Item
      label="Repeat password"
      name="repeat_password"
      rules={[
        {
          required: true,
          message: 'Please repeat your password',
        },
        {
          message: 'Passwords must match',
          min: passwordEnetered.length,
          pattern: new RegExp(passwordEnetered),
        },
      ]}
    >
      <Input.Password placeholder="example1*" prefix={<LockOutlined />} allowClear />
    </Item>
  );
};
