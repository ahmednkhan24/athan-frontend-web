import { Dispatch, SetStateAction, memo } from 'react';
import Button from 'react-bootstrap/Button';
import {
  ArrowLeftSquareFill,
  ArrowRightSquareFill,
} from 'react-bootstrap-icons';

const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const subtractDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
};

export interface DatesProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export const Dates = memo(({ date, setDate }: DatesProps) => (
  <div>
    <Button
      variant="light"
      onClick={() => setDate(() => subtractDays(date, 1))}
    >
      <ArrowLeftSquareFill size={35} />
    </Button>
    <Button
      variant="outline-secondary"
      onClick={() => console.log('TODO: open date picker')}
    >
      {date.toDateString()}
    </Button>
    <Button variant="light" onClick={() => setDate(() => addDays(date, 1))}>
      <ArrowRightSquareFill size={35} />
    </Button>
  </div>
));
