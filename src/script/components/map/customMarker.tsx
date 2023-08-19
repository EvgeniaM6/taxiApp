import { EnvironmentFilled } from '@ant-design/icons';
import { DivIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';

export const customMarker = (color: string): DivIcon => {
  const iconHtmlString = renderToString(
    <EnvironmentFilled
      style={{
        color,
        transform: 'translate(0px, -25px) scale(3.5)',
        opacity: 0.7,
      }}
    />
  );
  return new DivIcon({ html: iconHtmlString });
};
