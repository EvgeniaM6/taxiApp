import { Form, Input, Select } from 'antd';

const { Item } = Form;
const { Option } = Select;

export const PhoneInput = () => {
  const prefixSelector = (
    <Item
      name="prefix"
      noStyle
      rules={[{ required: true, message: 'Please input your phone number!' }]}
    >
      <Select style={{ width: 70 }}>
        <Option value="38">+38</Option>
      </Select>
    </Item>
  );

  return (
    <Item
      name="phone"
      label="Phone Number"
      rules={[
        {
          required: true,
          message: 'Please input your phone number!',
          pattern: /^[0-9]{3,15}$/,
          min: 3,
          max: 15,
        },
      ]}
    >
      <Input
        allowClear
        placeholder="0123456789"
        addonBefore={prefixSelector}
        style={{ width: '100%' }}
      />
    </Item>
  );
};
