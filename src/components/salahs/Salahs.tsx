import React, { useState, useCallback, useEffect } from 'react';
import {
  SalahItem,
  SalahItemProps,
  SalahItemType,
  SalahItemId,
  SalahItemText,
} from './SalahItem';
import { Dates } from 'components/dates/Dates';

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

// new Date().toDateString();
type DateString = string;
const existingDataMap = new Map<DateString, PrayerItemsTable>();

export const Prayers: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [itemsTable, setItemsTable] = useState(defaultEmptyTable);

  useEffect(() => {
    const existingData = existingDataMap.get(date.toDateString());
    setItemsTable(existingData ? existingData : defaultEmptyTable);
  }, [date]);

  const onClickItem = useCallback(
    (id: SalahItemId, type: SalahItemType) =>
      setItemsTable((prevTable) => {
        const updatedTable = {
          ...prevTable,
          [id]: { ...prevTable[id], type },
        };

        existingDataMap.set(date.toDateString(), updatedTable);

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
