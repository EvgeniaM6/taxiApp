import { Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Item } = Form;
const { Option } = Select;

export const PhoneInput = () => {
  const { t } = useTranslation();

  const prefixSelector = (
    <Item name="prefix" noStyle rules={[{ required: true, message: t('errMessagePhoneNumber') }]}>
      <Select style={{ width: 70 }}>
        <Option value="38">+38</Option>
      </Select>
    </Item>
  );

  return (
    <Item
      name="phone"
      label={t('labelPhoneNumber')}
      rules={[
        {
          required: true,
          message: t('errMessagePhoneNumber'),
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
