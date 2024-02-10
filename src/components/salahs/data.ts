import { Dayjs } from 'dayjs';
import { SalahItemProps, SalahItemId } from './SalahItem';

export type SalahData = Omit<SalahItemProps, 'onClick' | 'disabled'>;

export type SalahDataTable = Record<SalahItemId, SalahData>;

export const existingDataMap = new Map<string, SalahDataTable>();
export const pendingRequestsStack = new Map<string, SalahDataTable[]>();

const dataTablesAreEqual = (a: SalahDataTable, b: SalahDataTable) =>
  Object.keys(a).every((salahId) => {
    const id = salahId as SalahItemId;
    return a[id].type === b[id].type;
  });

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const API = {
  get: async (date: Dayjs) => {
    await wait(1000);
    const dateKey = date.toDate().toDateString();
    const existingLocalData = existingDataMap.get(dateKey);
    if (existingLocalData) return existingLocalData;

    const existingStorageData = localStorage.getItem(dateKey);
    if (existingStorageData) {
      return JSON.parse(existingStorageData) as SalahDataTable;
    }
  },
  add: async (date: Dayjs, value: SalahDataTable) => {
    await wait(1000);
    const dateKey = date.toDate().toDateString();

    existingDataMap.set(dateKey, value);

    const pendingStack = pendingRequestsStack.get(dateKey) ?? [];
    pendingRequestsStack.set(dateKey, [...pendingStack, value]);

    setTimeout(() => {
      const pendingStack = pendingRequestsStack.get(dateKey) ?? [];
      if (!pendingStack.length) return;

      const lastItem = pendingStack[pendingStack.length - 1];
      if (!dataTablesAreEqual(value, lastItem)) return;

      // imitate API call
      wait(500).then(() => {
        localStorage.setItem(dateKey, JSON.stringify(value));
        pendingRequestsStack.set(dateKey, []);
      });
    }, 3000);
  },
};
