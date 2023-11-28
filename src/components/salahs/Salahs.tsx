import React, { useState, useCallback } from 'react';
import {
  SalahItem,
  SalahItemProps,
  SalahItemType,
  SalahItemId,
} from './SalahItem';
import { Dates } from 'components/dates/Dates';

export type PrayerItemsTable = {
  [key: string]: Omit<SalahItemProps, 'onClick' | 'disabled'>;
};

export const prayers: Omit<SalahItemProps, 'onClick' | 'disabled'>[] = [
  {
    id: 'fajr',
    text: 'Fajr',
    type: undefined,
  },
  {
    id: 'dhur',
    text: 'Dhur',
    type: undefined,
  },
  {
    id: 'asr',
    text: 'Asr',
    type: undefined,
  },
  { id: 'maghreb', text: 'Maghreb', type: undefined },
  {
    id: 'isha',
    text: 'Isha',
    type: undefined,
  },
];

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
