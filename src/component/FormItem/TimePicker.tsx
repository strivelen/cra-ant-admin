import { Dayjs } from 'dayjs';
import * as React from 'react';
import { DayJsDatePicker } from './DatePicker';
import { PickerTimeProps } from 'antd/es/date-picker/generatePicker';

export interface TimePickerProps
  extends Omit<PickerTimeProps<Dayjs>, 'picker'> {}

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => {
  return (
    <DayJsDatePicker {...props} picker="time" mode={undefined} ref={ref} />
  );
});

TimePicker.displayName = 'TimePicker';

export default TimePicker;
