import { memo, useCallback } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './salah-item.module.css';

type BootStrapItemVariants = 'success' | 'danger' | 'warning' | '';
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

const convertItemTypeToBootstrapType = (
  type: SalahItemType
): BootStrapItemVariants => {
  switch (type) {
    case 'onTime':
      return 'success';
    case 'missed':
      return 'danger';
    case 'madeUp':
      return 'warning';
    default:
      return '';
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

    return (
      <ListGroup.Item
        action
        id={id}
        variant={convertItemTypeToBootstrapType(type)}
        onClick={onClickItem}
        disabled={disabled}
        className={styles.item}
      >
        {`${text}${convertItemTypeToTextContent(type)}`}
      </ListGroup.Item>
    );
  }
);
