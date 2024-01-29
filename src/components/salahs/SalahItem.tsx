import { memo, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Styled = {
  AlertContainer: styled.div({
    cursor: 'pointer',
    padding: '20px 0',
  }),
};

type MuiItemVariants = 'info' | 'success' | 'warning' | 'error';
export type SalahItemType = 'onTime' | 'missed' | 'madeUp' | undefined;
export type SalahItemText = 'Fajr' | 'Dhur' | 'Asr' | 'Maghreb' | 'Isha';
export type SalahItemId = Lowercase<SalahItemText>;

export type SalahItemProps = {
  id: SalahItemId;
  text: SalahItemText;
  type: SalahItemType;
  onClick: (id: SalahItemId, type: SalahItemType) => void;
  disabled?: boolean;
};

const convertItemTypeToMuiType = (type: SalahItemType): MuiItemVariants => {
  switch (type) {
    case 'onTime':
      return 'success';
    case 'missed':
      return 'error';
    case 'madeUp':
      return 'warning';
    default:
      return 'info';
  }
};

const convertItemTypeToTextContent = (type: SalahItemType) => {
  switch (type) {
    case 'onTime':
      return ' - On Time';
    case 'missed':
      return ' - Missed';
    case 'madeUp':
      return ' - Made Up';
    default:
      return '';
  }
};

const getUpdatedType = (type: SalahItemType): SalahItemType => {
  switch (type) {
    case 'onTime':
      return 'missed';
    case 'missed':
      return 'madeUp';
    case 'madeUp':
      return undefined;
    default:
      return 'onTime';
  }
};

export const SalahItem = memo(
  ({ id, text, type, onClick, disabled }: SalahItemProps) => {
    const onClickItem = useCallback(
      () => onClick(id, getUpdatedType(type)),
      [id, onClick, type]
    );

    const muiItem = useMemo(() => convertItemTypeToMuiType(type), [type]);

    return (
      <Styled.AlertContainer>
        <Alert
          variant={muiItem === 'info' ? 'outlined' : 'filled'}
          severity={muiItem}
          onClick={onClickItem}
        >
          <AlertTitle>{`${text}${convertItemTypeToTextContent(
            type
          )}`}</AlertTitle>
        </Alert>
      </Styled.AlertContainer>
    );
  }
);
