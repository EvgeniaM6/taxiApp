import { Col, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import GithubIcon from '../../../assets/images/svg/github.svg';
const { Option } = Select;

export const FooterElem = () => {
  const { i18n } = useTranslation();

  const changeLang = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Row>
      <Col span={8} className="footer__lang">
        <Select onChange={changeLang} defaultValue={i18n.language}>
          <Option value="en">en</Option>
          <Option value="ua">ua</Option>
        </Select>
      </Col>
      <Col span={8} className="footer__year">
        2023
      </Col>
      <Col span={8} className="footer__gh-link">
        <a href="https://github.com/EvgeniaM6">
          <img src={GithubIcon} alt="" className="footer__gh-link-img" />
        </a>
      </Col>
    </Row>
  );
};
