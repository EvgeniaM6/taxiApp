import { Select, Spin } from 'antd';
import { LabeledValue } from 'antd/es/select';
import { GeocodingResult } from 'leaflet-control-geocoder/dist/geocoders';
import { useMemo, useRef, useState } from 'react';
import { IGeocodeSelectProps, IGeocodeValue } from '../../models';
import { setCanBuildRoute } from '../../store/routeSlice';
import { useAppDispatch } from '../../hooks';

export function GeocodeSelect<
  ValueType extends { key?: string; label: React.ReactNode; value: string | number },
>({ fetchOptions, setPoint, setAddress, ...props }: IGeocodeSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const [geocodeResults, setGeocodeResults] = useState<GeocodingResult[]>([]);
  const fetchRef = useRef(0);

  const dispatch = useAppDispatch();

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions: GeocodingResult[]) => {
        if (fetchId !== fetchRef.current) {
          return;
        }
        const result = newOptions.map((resultObj: GeocodingResult) => ({
          label: resultObj.name,
          value: resultObj.properties.place_id,
        }));

        setOptions(result as ValueType[]);
        setGeocodeResults(newOptions);
        setFetching(false);
      });
    };

    return loadOptions;
  }, [fetchOptions]);

  const selectPoint = (value: string | number | LabeledValue) => {
    dispatch(setCanBuildRoute(false));
    const selectedAdress = geocodeResults.find((val) => {
      return val.properties.place_id === (value as IGeocodeValue).value;
    });

    if (!selectedAdress) {
      setPoint(null);
      setAddress('');
    } else {
      const {
        center: { lat, lng },
        name,
      } = selectedAdress;
      setPoint({ lat, lng });
      setAddress(name);
    }
    setTimeout(() => {
      dispatch(setCanBuildRoute(true));
    }, 0);
  };

  return (
    <Select
      showSearch
      allowClear
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
      onSelect={selectPoint}
    />
  );
}
