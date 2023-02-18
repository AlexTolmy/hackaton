export type DateTimePickerProps = {
  initialDate: Date;
  onNewDateSelect: (newDate: Date) => void;
  className?: string;
};

export type PopupContainerProps = {
  cornerParentElement: SVGSVGElement;
  selectedDate: Date;
  visibleMonthDate: Date;
  hidePopup: () => void;
  setVisibleMonthDate: (newDate: Date) => void;
  setSelectedDate: (newDate: Date) => void;
  onNewDateSelect: (newDate: Date) => void;
};

export type PopupMonthSelectorProps = {
  visibleMonthDate: Date;
  setVisibleMonthDate: (newDate: Date) => void;
};

export type PopupTableProps = {
  activeDay: Date;
  activeMonth: Date;
  setActiveDay: (newDate: Date) => void;
};

export type PopupTableCellProps = {
  value: string;
  className: string;
};

export type PopupTimeSelectorProps = {
  activeDay: Date;
  setActiveDay: (newDate: Date) => void;
};

export type DayType = {
  isCurrentMonth: boolean;
  dayDate: Date;
  monthNumber: number;
  dayNumber: number;
  isActiveDay: boolean;
  year: number;
};
