import { UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

const { Item } = Form;

export const NameInput = () => {
  return (
    <Item
      name="name"
      label="Your name"
      rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
        {
          message: 'Your name must contain only letters',
          pattern: /^[A-Z,А-Я,a-z,а-я]{1,35}$/,
          min: 1,
          max: 35,
        },
      ]}
      tooltip="What do you want we to call you?"
    >
      <Input prefix={<UserOutlined />} allowClear placeholder="Pavlo" style={{ width: '100%' }} />
    </Item>
  );
};
