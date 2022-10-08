import dayjs, { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';

export const DayJsDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default function DatePicker({
  value,
  onChange,
  ...otherProps
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <DayJsDatePicker
      allowClear
      value={dayjs(value)}
      onChange={(val) => onChange && onChange(dayjs(val).format('YYYY-MM-DD'))}
      {...otherProps}
    />
  );
}
