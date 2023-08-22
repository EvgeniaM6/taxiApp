import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
const { Option } = Select;

export const FooterElem = () => {
  const { i18n } = useTranslation();

  const changeLang = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select onChange={changeLang} defaultValue={i18n.language}>
      <Option value="en">en</Option>
      <Option value="ua">ua</Option>
    </Select>
  );
};
