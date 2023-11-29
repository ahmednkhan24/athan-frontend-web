import React, { useState, useCallback } from 'react';
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

export const Prayers: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [itemsTable, setItemsTable] = useState(
    prayers.reduce((table, item) => {
      table[item.id] = item;
      return table;
    }, {} as PrayerItemsTable)
  );

  const onClickItem = useCallback(
    (id: SalahItemId, type: SalahItemType) =>
      setItemsTable((prevTable) => ({
        ...prevTable,
        [id]: { ...prevTable[id], type },
      })),
    []
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
