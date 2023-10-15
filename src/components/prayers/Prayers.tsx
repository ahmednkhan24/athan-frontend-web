import React, { useState, useCallback } from 'react';
import {
  PrayerItem,
  PrayerItemProps,
  PrayerItemType,
  PrayerItemId,
} from './PrayerItem';

export type PrayerItemsTable = {
  [key: string]: Omit<PrayerItemProps, 'onClick' | 'disabled'>;
};

export const prayers: Omit<PrayerItemProps, 'onClick' | 'disabled'>[] = [
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
  {
    id: 'isha',
    text: 'Isha',
    type: undefined,
  },
];

export const Prayers: React.FC = () => {
  const [itemsTable, setItemsTable] = useState(
    prayers.reduce((table, item) => {
      table[item.id] = item;
      return table;
    }, {} as PrayerItemsTable)
  );

  const onClickItem = useCallback(
    (id: PrayerItemId, type: PrayerItemType) => {
      const table = structuredClone(itemsTable);
      table[id] = { ...table[id], type };
      setItemsTable(table);
    },
    [itemsTable]
  );

  return (
    <div>
      {Object.values(itemsTable).map((item) => (
        <PrayerItem key={item.id} {...item} onClick={onClickItem} />
      ))}
    </div>
  );
};
