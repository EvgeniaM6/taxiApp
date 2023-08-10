import { Radio, RadioChangeEvent } from 'antd';
import { carClassesObj } from '../../../constants';
import { TCarClassObj } from '../../models';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCarClass } from '../../store/routeSlice';

export const CarClassChoice = () => {
  const { carClass } = useAppSelector((state) => state.route);
  const dispatch = useAppDispatch();

  const chooseCarClass = (e: RadioChangeEvent): void => {
    dispatch(setCarClass(e.target.value));
  };

  return (
    <Radio.Group onChange={chooseCarClass} value={carClass}>
      {Object.keys(carClassesObj).map((carClassKey) => {
        const carClassObj: TCarClassObj = carClassesObj[carClassKey];
        return (
          <Radio.Button value={carClassKey} key={carClassKey}>
            {carClassObj.title}
          </Radio.Button>
        );
      })}
    </Radio.Group>
  );
};
