import { Tagz } from '@components/core';
import { formatNumber } from '@lib/helper';
import { useDataState } from '@store';
import moment from 'moment';

export const TimeBody = (value, type = 'datetime') => {
  let format = type === 'time' ? 'HH:mm:ss' : type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm:ss';
  if (value) return <p className="text-center">{moment(value).format(format)}</p>;
};

export const NumberBody = (value) => {
  if (value) return <p className="text-center">{formatNumber(value)}</p>;
  else return <p className="text-center">0</p>;
};

export const Body = (data = [], value, key = 'key', label = 'label') => {
  const item = data.find((d) => d[key] === value) || {};
  if (item.color) return <Tagz severity={item.color} value={item[label]} className="text-center" />;
  else return item[label];
};

export const UserBody = (time, accountId) => {
  const { accounts } = useDataState();

  return (
    <div className="flex flex-col gap-1 justify-center items-center">
      <span>{moment(time).format('DD/MM/YYYY HH:mm:ss')}</span>
      <span>{accounts.find((a) => a._id === accountId)?.fullName}</span>
    </div>
  );
};
