import { MailOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

const { Item } = Form;

export const EmailInput = () => {
  return (
    <Item
      label="E-mail"
      name="e_mail"
      rules={[{ required: true, message: 'Please input your e-mail', type: 'email' }]}
    >
      <Input prefix={<MailOutlined />} placeholder="example@mail.ua" allowClear />
    </Item>
  );
};
