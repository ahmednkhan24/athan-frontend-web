import { memo, useCallback } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './prayer-item.module.css';

type BootStrapItemVariants = 'success' | 'danger' | 'warning' | '';
export type PrayerItemType = 'onTime' | 'missed' | 'madeUp' | undefined;
export type PrayerItemText = 'Fajr' | 'Dhur' | 'Asr' | 'Maghreb' | 'Isha';
export type PrayerItemId = Lowercase<PrayerItemText>;

export type PrayerItemProps = {
  id: PrayerItemId;
  text: PrayerItemText;
  type: PrayerItemType;
  onClick: (id: PrayerItemId, type: PrayerItemType) => void;
  disabled?: boolean;
};

const convertItemTypeToBootstrapType = (
  type: PrayerItemType
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

const convertItemTypeToTextContent = (type: PrayerItemType) => {
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

const getUpdatedType = (type: PrayerItemType): PrayerItemType => {
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

export const PrayerItem = memo(
  ({ id, text, type, onClick, disabled }: PrayerItemProps) => {
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
