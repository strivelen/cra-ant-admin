import Table from 'component/Table';
import { Alert } from 'antd';

export default function TableTest() {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Alert
          closable
          message="提示"
          description={
            <div>
              源代码文件地址：
              <strong>/src/page/Table</strong>
            </div>
          }
          type="warning"
        />
      </div>
      <Table
        isPagination={false}
        pagerLocation={['bottomCenter']}
        sortName="Name"
        isInvertedOrder={true}
        api="/User/List"
        columns={[
          {
            title: '姓名',
            dataIndex: 'Name',
            key: 'Name'
            // sorter: true
          },
          {
            title: '创建时间',
            dataIndex: 'CreateTime',
            key: 'CreateTime'
          },
          {
            title: '操作',
            key: 'action',
            render: (text, record, index) => {
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              return <a onClick={() => console.log('自定义事件')}>查看</a>;
            }
          }
        ]}
      />
    </>
  );
}
