export type DatesPeriodSelectorProps = {
  initialStartDate: Date;
  initialEndDate: Date;
  onStartDateChange: (newDate: Date) => void;
  onEndDateChange: (newDate: Date) => void;
  datePickerClassName?: string;
  className?: string;
};
