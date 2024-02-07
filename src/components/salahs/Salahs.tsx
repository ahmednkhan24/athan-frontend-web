import React, { useState, useCallback, useEffect } from 'react';
import {
  SalahItem,
  SalahItemProps,
  SalahItemType,
  SalahItemId,
  SalahItemText,
} from './SalahItem';
import styled from '@emotion/styled';
import { Dates } from 'components/dates';
import dayjs, { Dayjs } from 'dayjs';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Styled = {
  Container: styled.div({
    marginTop: 20,
  }),
};

type SalahData = Omit<SalahItemProps, 'onClick' | 'disabled'>;

export type SalahDataTable = Record<SalahItemId, SalahData>;

const capitalizeFirstLetter = (s: SalahItemId): SalahItemText =>
  (s.charAt(0).toUpperCase() + s.slice(1)) as SalahItemText;

const ids: SalahItemId[] = ['fajr', 'dhur', 'asr', 'maghreb', 'isha'];

const salahs: SalahData[] = ids.map((id) => ({
  id,
  text: capitalizeFirstLetter(id),
  type: undefined,
}));

const defaultEmptyTable = salahs.reduce((table, item) => {
  table[item.id] = item;
  return table;
}, {} as SalahDataTable);

const existingDataMap = new Map<string, SalahDataTable>();

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Loading = () => (
  <Stack spacing={1}>
    <Skeleton variant="rounded" height={60} />
    {Object.keys(defaultEmptyTable).map(() => (
      <Skeleton variant="rounded" height={60} />
    ))}
  </Stack>
);

export const Salahs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [itemsTable, setItemsTable] = useState(defaultEmptyTable);

  useEffect(() => {
    const existingData = existingDataMap.get(date.toDate().toDateString());
    setItemsTable(existingData ? existingData : defaultEmptyTable);
  }, [date]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await wait(1000);
      setLoading(false);
    };

    fetchData();
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
    <Styled.Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Dates date={date} setDate={setDate} />
          {Object.values(itemsTable).map((item) => (
            <SalahItem key={item.id} {...item} onClick={onClickItem} />
          ))}
        </>
      )}
    </Styled.Container>
  );
};
