import React, { useState, useCallback, useEffect } from 'react';
import {
  SalahItem,
  SalahItemProps,
  SalahItemType,
  SalahItemId,
  SalahItemText,
} from './SalahItem';
import { Dates } from 'components/dates/Dates';
import dayjs, { Dayjs } from 'dayjs';

type PrayerItem = Omit<SalahItemProps, 'onClick' | 'disabled'>;

export type PrayerItemsTable = Record<SalahItemId, PrayerItem>;

const capitalizeFirstLetter = (s: SalahItemId): SalahItemText =>
  (s.charAt(0).toUpperCase() + s.slice(1)) as SalahItemText;

const ids: SalahItemId[] = ['fajr', 'dhur', 'asr', 'maghreb', 'isha'];

const prayers: PrayerItem[] = ids.map((id) => ({
  id,
  text: capitalizeFirstLetter(id),
  type: undefined,
}));

const defaultEmptyTable = prayers.reduce((table, item) => {
  table[item.id] = item;
  return table;
}, {} as PrayerItemsTable);

const existingDataMap = new Map<string, PrayerItemsTable>();

export const Prayers: React.FC = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [itemsTable, setItemsTable] = useState(defaultEmptyTable);

  useEffect(() => {
    const existingData = existingDataMap.get(date.toDate().toDateString());
    setItemsTable(existingData ? existingData : defaultEmptyTable);
  }, [date]);

  const onClickItem = useCallback(
    (id: SalahItemId, type: SalahItemType) =>
      setItemsTable((prevTable) => {
        const updatedTable = {
          ...prevTable,
          [id]: { ...prevTable[id], type },
        };

        existingDataMap.set(date.toDate().toDateString(), updatedTable);

        return updatedTable;
      }),
    [date]
  );

  return (
    <div>
      <Dates date={date} setDate={setDate} />
      {Object.values(itemsTable).map((item) => (
        <SalahItem key={item.id} {...item} onClick={onClickItem} />
      ))}
    </div>
  );
};
