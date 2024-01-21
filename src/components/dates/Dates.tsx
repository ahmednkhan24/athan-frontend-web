import { Dispatch, SetStateAction, memo, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import {
  CalendarXFill,
  ArrowLeftSquareFill,
  ArrowRightSquareFill,
} from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import styles from './dates.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

const addDays = (d: Date, days: number) => {
  const date = new Date(d);
  date.setDate(date.getDate() + days);
  return date;
};

const subtractDays = (d: Date, days: number) => {
  const date = new Date(d);
  date.setDate(date.getDate() - days);
  return date;
};

const isInThePast = (d: Date) => d.getTime() <= new Date().getTime();

const isToday = (d: Date) => d.toDateString() === new Date().toDateString();

export interface DatesProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export const Dates = memo(({ date, setDate }: DatesProps) => {
  const resetDate = useCallback(() => setDate(new Date()), [setDate]);

  const goBackOneDay = useCallback(
    () => setDate(() => subtractDays(date, 1)),
    [date, setDate]
  );

  const goForwardOneDay = useCallback(() => {
    const updatedDate = addDays(date, 1);
    if (isInThePast(updatedDate)) setDate(updatedDate);
    else resetDate();
  }, [date, resetDate, setDate]);

  const onSelectDate = useCallback(
    (selectedDate: Date | null) => {
      if (!selectedDate) {
        resetDate();
        return;
      }

      if (!isInThePast(selectedDate)) {
        resetDate();
        toast.warn("You can't select a date in the future.");
        return;
      }

      setDate(selectedDate);
    },
    [resetDate, setDate]
  );

  return (
    <div className={styles.datesContainer}>
      <Button variant="light" onClick={goBackOneDay}>
        <ArrowLeftSquareFill size={35} />
      </Button>
      <span className={styles.dateInputPicker}>
        <DatePicker
          withPortal
          className="form-control"
          selected={date}
          onChange={onSelectDate}
        />
        {!isToday(date) && (
          <Button variant="light" onClick={resetDate}>
            <CalendarXFill size={20} />
          </Button>
        )}
      </span>
      <Button
        variant="light"
        onClick={goForwardOneDay}
        disabled={isToday(date)}
      >
        <ArrowRightSquareFill size={35} />
      </Button>
    </div>
  );
});
