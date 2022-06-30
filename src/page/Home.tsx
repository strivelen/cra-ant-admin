import Password from 'component/FormItem/Password';
import DatePicker from 'component/FormItem/DatePicker';
// import { DatePicker } from 'antd';

export default function Home() {
  return (
    <>
      <h1>
        Home Page <Password />
      </h1>
      <DatePicker />
    </>
  );
}
