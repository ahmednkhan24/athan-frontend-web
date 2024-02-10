import { Dayjs } from 'dayjs';
import { SalahItemProps, SalahItemId } from './SalahItem';

export type SalahData = Omit<SalahItemProps, 'onClick' | 'disabled'>;

export type SalahDataTable = Record<SalahItemId, SalahData>;

export const existingDataMap = new Map<string, SalahDataTable>();

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const API = {
  get: async (date: Dayjs) => {
    await wait(1000);
    return existingDataMap.get(date.toDate().toDateString());
  },
  add: async (date: Dayjs, value: SalahDataTable) => {
    await wait(1000);
    existingDataMap.set(date.toDate().toDateString(), value);
  },
};
