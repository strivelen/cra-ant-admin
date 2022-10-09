import { useState } from 'react';
import { Button, Alert } from 'antd';
import Filter from 'component/Filter';

export default function FilterTest() {
  const [value, setValue] = useState<string>();
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Alert
          closable
          message="提示"
          description={
            <div>
              源代码文件地址：
              <strong>/src/page/Filter</strong>
            </div>
          }
          type="warning"
        />
      </div>
      <Filter
        fieldsConfig={[
          {
            label: '姓名',
            fields: 'Name',
            component: 'Input',
            // componentProps: {},
            defaultValue: '张三'
          },
          {
            label: '年龄',
            fields: 'Age',
            defaultValue: 18,
            component: 'InputNumber',
            componentProps: {}
          }
        ]}
        onSubmit={(filterValue) => setValue(JSON.stringify({ ...filterValue }))}
      >
        <Button type="primary" onClick={() => console.log('点击了新增按钮')}>
          新增
        </Button>
      </Filter>
      <div style={{ padding: '20px 42px' }}>输出：{value}</div>
    </>
  );
}
