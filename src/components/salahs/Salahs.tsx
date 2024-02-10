import React, { useState, useCallback, useEffect } from 'react';
import {
  SalahItem,
  SalahItemType,
  SalahItemId,
  SalahItemText,
} from './SalahItem';
import styled from '@emotion/styled';
import { Dates } from 'components/dates';
import dayjs, { Dayjs } from 'dayjs';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { API, SalahData, SalahDataTable } from './data';

const Styled = {
  Container: styled.div({
    marginTop: 20,
  }),
};

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

const Loading = () => (
  <Stack spacing={4}>
    <Skeleton
      sx={{
        visibility: 'hidden',
      }}
      variant="rounded"
      height={60}
    />
    {Array(ids.length)
      .fill(null)
      .map((_, idx) => (
        <Skeleton key={idx} variant="rounded" height={60} />
      ))}
  </Stack>
);

export const Salahs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [itemsTable, setItemsTable] = useState(defaultEmptyTable);

  useEffect(() => {
    const fetchItemsTableData = async () => {
      setLoading(true);
      const data = await API.get(date);
      setLoading(false);
      setItemsTable(data ? data : defaultEmptyTable);
    };

    fetchItemsTableData();
  }, [date]);

  const onClickItem = useCallback(
    (id: SalahItemId, type: SalahItemType) =>
      setItemsTable((prevTable) => {
        const updatedTable = {
          ...prevTable,
          [id]: { ...prevTable[id], type },
        };

        API.add(date, updatedTable);

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
