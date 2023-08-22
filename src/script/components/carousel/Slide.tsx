import React from 'react';
import { Typography } from 'antd';
import { TSlideProps } from '../../models';
const { Title, Paragraph } = Typography;

const titleStyle: React.CSSProperties = {
  color: '#fff',
};

export const Slide = (props: React.PropsWithChildren<TSlideProps>) => {
  const { imgSrc, title, children } = props;

  return (
    <div className="slide">
      <div className="slide__title">
        <Title level={3} className="slide__title-main" style={titleStyle}>
          {title}
        </Title>
        <Paragraph style={titleStyle}>{children}</Paragraph>
      </div>
      <img src={imgSrc} alt="" className="slide__image" />
    </div>
  );
};
