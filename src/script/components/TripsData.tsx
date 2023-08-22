import { Table, Tooltip } from 'antd';
import { TTripsTableData, TUpdatedUserTrips } from '../models';
import { convertDate, shortenAddressesArr } from '../utils';
import { useTranslation } from 'react-i18next';

export const TripsData = (props: { userTrips: TUpdatedUserTrips | null; isLoading: boolean }) => {
  const { userTrips, isLoading } = props;
  const { t } = useTranslation();

  const dataSource: TTripsTableData[] = userTrips
    ? Object.keys(userTrips)
        .sort((a, b) => Number(b) - Number(a))
        .map((timeStamp, i) => {
          const tripDate = new Date(Number(timeStamp));
          const date = `${tripDate.getFullYear()}-${convertDate(
            tripDate.getMonth() + 1
          )}-${convertDate(tripDate.getDate())} ${convertDate(tripDate.getHours())}:${convertDate(
            tripDate.getMinutes()
          )}`;
          const { startAddress, finishAddress } = userTrips[timeStamp];
          return {
            key: i + 1,
            date,
            from: startAddress,
            to: finishAddress,
          };
        })
    : [];

  const filterDateStrArr = userTrips
    ? Object.keys(userTrips).map((timeStamp) => {
        const tripDate = new Date(Number(timeStamp));
        const dateStr = `${tripDate.getFullYear()}-${convertDate(
          tripDate.getMonth() + 1
        )}-${convertDate(tripDate.getDate())}`;
        return dateStr;
      })
    : [];

  const filterDateStrUniqueArr = new Set(filterDateStrArr);
  const filterDateArr = new Array(...filterDateStrUniqueArr).map((dateStr) => {
    return {
      text: dateStr,
      value: dateStr,
    };
  });

  const filterFromAddressStrArr = userTrips
    ? Object.values(userTrips).map((tripData) => {
        return tripData.startAddress;
      })
    : [];

  const filterToAddressStrArr = userTrips
    ? Object.values(userTrips).map((tripData) => {
        return tripData.finishAddress;
      })
    : [];

  const columns = [
    {
      title: t('columnDate'),
      dataIndex: 'date',
      key: 'date',
      filterSearch: true,
      filters: filterDateArr,
      onFilter: (value: string | number | boolean, record: TTripsTableData) => {
        return record.date.startsWith(value.toString());
      },
    },
    {
      title: t('columnFrom'),
      dataIndex: 'from',
      key: 'from',
      filterSearch: true,
      filters: shortenAddressesArr(filterFromAddressStrArr),
      onFilter: (value: string | number | boolean, record: TTripsTableData) => {
        return record.from.includes(value.toString().split('...')[0]);
      },
      ellipsis: {
        showTitle: false,
      },
      render: (fromAddress: string) => (
        <Tooltip placement="topLeft" title={fromAddress}>
          {fromAddress}
        </Tooltip>
      ),
    },
    {
      title: t('columnTo'),
      dataIndex: 'to',
      key: 'to',
      filterSearch: true,
      filters: shortenAddressesArr(filterToAddressStrArr),
      onFilter: (value: string | number | boolean, record: TTripsTableData) => {
        return record.to.includes(value.toString().split('...')[0]);
      },
      ellipsis: {
        showTitle: false,
      },
      render: (toAddress: string) => (
        <Tooltip placement="topLeft" title={toAddress}>
          {toAddress}
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} loading={isLoading} />
    </div>
  );
};
