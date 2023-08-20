import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

const { Item } = Form;

export const RepeatPasswordInput = () => {
  return (
    <Item
      label="Repeat password"
      name="repeat_password"
      rules={[
        {
          required: true,
          message: 'Please repeat your password',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The new password that you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password placeholder="example1*" prefix={<LockOutlined />} allowClear />
    </Item>
  );
};
