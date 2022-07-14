import { Button } from 'antd';
import CRUDTemplate, { AddAction, UpdateAction } from 'component/CRUDTemplate';

export default function Home() {
  return (
    <CRUDTemplate
      queryFieldsConfig={[
        {
          label: '测试',
          fields: 'Name',
          component: 'Input'
          // componentProps: {},
          // defaultValue: '123321'
        },
        {
          label: '测试1',
          fields: 'Name1',
          component: 'Input'
          // componentProps: {}
        }
      ]}
      tableConfig={{
        // pagerLocation: ['topRight'],
        api: '/User/List',
        columns: [
          {
            title: '姓名',
            dataIndex: 'Name',
            key: 'Name',
            sorter: true
          },
          {
            title: '创建时间',
            dataIndex: 'CreateTime',
            key: 'CreateTime'
          },
          {
            title: 'option',
            key: 'columnAction',
            render: (_) => {
              return <a>跳转</a>;
            }
          },
          {
            title: 'LastClassTime',
            dataIndex: 'LastClassTime',
            key: 'LastClassTime'
          },
          {
            title: '操作',
            key: 'action',
            render: (_, record, index) => {
              return (
                <UpdateAction
                  record={record}
                  modalOption={{
                    detailApi: '/User/Get',
                    title: '修改用户2',
                    submitApi: '/User/Add',
                    fields: {
                      Name: {
                        rules: [{ required: true, message: '请输入姓名' }],
                        label: '姓名',
                        component: 'Input'
                      },
                      CreateTime: {
                        // isFillLine: true,
                        component: 'Input',
                        label: '创建时间'
                      }
                    }
                  }}
                  actionCom={({ onShowModal }) => (
                    <a onClick={onShowModal}>修改</a>
                  )}
                />
              );
            }
          }
        ]
      }}
      actions={(filterForm) => {
        return (
          <>
            <AddAction
              modalOption={{
                title: '新增用户',
                submitApi: '/User/Add',
                fields: {
                  Name: {
                    rules: [{ required: true, message: '请输入姓名' }],
                    label: '姓名',
                    component: 'Input'
                  },
                  CompanyName: {
                    // isFillLine: true,
                    component: 'Input',
                    label: '公司名称'
                  }
                }
              }}
              actionCom={({ onShowModal }) => (
                <Button type="primary" onClick={onShowModal}>
                  新增
                </Button>
              )}
            />
            <Button type="primary" style={{ marginLeft: 30 }}>
              新增2
            </Button>
          </>
        );
      }}
    />
  );
}
