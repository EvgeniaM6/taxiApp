import { Radio, RadioChangeEvent } from 'antd';
import { CAR_CLASSES_OBJ } from '../../../constants';
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
      {Object.keys(CAR_CLASSES_OBJ).map((carClassKey) => {
        const carClassObj: TCarClassObj = CAR_CLASSES_OBJ[carClassKey];
        return (
          <Radio.Button value={carClassKey} key={carClassKey}>
            {carClassObj.title}
          </Radio.Button>
        );
      })}
    </Radio.Group>
  );
};
