import { Dispatch, SetStateAction, memo, useCallback } from 'react';
import styled from '@emotion/styled';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

// icons
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowBack';
import ArrowRightIcon from '@mui/icons-material/ArrowForward';
import CalendarReset from '@mui/icons-material/EventRepeat';

dayjs.extend(isToday);

const Styled = {
  DateContainer: styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
};

export interface DatesProps {
  date: Dayjs;
  setDate: Dispatch<SetStateAction<Dayjs>>;
}

export const Dates = memo(({ date, setDate }: DatesProps) => {
  const resetDate = useCallback(() => setDate(dayjs()), [setDate]);

  const goBackOneDay = useCallback(
    () => setDate((d) => d.subtract(1, 'day')),
    [setDate]
  );

  const goForwardOneDay = useCallback(
    () => setDate((d) => d.add(1, 'day')),
    [setDate]
  );

  const onSelectDate = useCallback(
    (selectedDate: Dayjs | null) => {
      if (selectedDate) {
        setDate(selectedDate);
      } else {
        resetDate();
      }
    },
    [resetDate, setDate]
  );

  return (
    <Styled.DateContainer>
      <IconButton size="large" onClick={goBackOneDay}>
        <ArrowLeftIcon />
      </IconButton>
      <div>
        <MobileDatePicker
          value={dayjs(date)}
          closeOnSelect
          disableFuture
          onAccept={onSelectDate}
        />
        {!date.isToday() && (
          <IconButton size="large" onClick={resetDate}>
            <CalendarReset />
          </IconButton>
        )}
      </div>
      <IconButton
        size="large"
        disabled={date.isToday()}
        onClick={goForwardOneDay}
      >
        <ArrowRightIcon />
      </IconButton>
    </Styled.DateContainer>
  );
});
