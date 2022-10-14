import { Button, Divider, Alert } from 'antd';
import CRUDTemplate, {
  AddAction,
  UpdateAction,
  DeleteAction,
  ExportAction,
  ViewAction
} from 'component/CRUDTemplate';

export default function PageCRUDTemplate() {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Alert
          closable
          message="提示"
          description={
            <div>
              源代码文件地址：
              <strong>/src/page/CRUDTemplate</strong>
            </div>
          }
          type="warning"
        />
      </div>
      <CRUDTemplate
        queryFields={[
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
          api: { url: '/User/List' },
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
                  <>
                    <ViewButton record={record} />
                    <Divider type="vertical" />
                    <UpdateButton record={record} />
                    <Divider type="vertical" />
                    <DeleteButton record={record} />
                  </>
                );
              }
            }
          ]
        }}
        actions={(filterForm) => {
          return (
            <>
              <AddAction
                option={{
                  width: 690,
                  title: '新增用户',
                  submitApi: { url: '/User/Add' },
                  fields: {
                    Name: {
                      rules: [{ required: true, message: '请输入姓名' }],
                      label: '姓名',
                      component: 'Input'
                      // initialValue: '张三'
                    },
                    CreateTime: {
                      // isFillLine: true,
                      component: 'DatePicker',
                      componentProps: {
                        format: 'YYYY-MM-DD'
                      },
                      label: '创建时间',
                      initialValue: '2023-01-01'
                    },
                    FileUpload: {
                      isFillLine: true,
                      component: 'SingleImgUpload',
                      componentProps: {},
                      label: '文件上传',
                      initialValue:
                        'https://i.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA'
                    }
                    // FileUpload: {
                    //   isFillLine: true,
                    //   // labelCol: { span: 5 },
                    //   // rules: [{ required: true, message: '请上传文件' }],
                    //   component: 'Upload',
                    //   componentProps: {
                    //     action: '',
                    //     listType: 'picture'
                    //   },
                    //   label: '文件上传',
                    //   initialValue: [
                    //     {
                    //       uid: '-1',
                    //       name: 'test.png',
                    //       status: 'done',
                    //       url: 'https://i.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA'
                    //     }
                    //   ]
                    // }
                  }
                }}
                actionCom={({ onAction }) => (
                  <Button type="primary" onClick={onAction}>
                    新增
                  </Button>
                )}
              />
              <ExportAction
                option={{
                  api: '',
                  params: {}
                }}
                actionCom={({ onAction }) => (
                  <Button
                    style={{ marginLeft: 20 }}
                    type="primary"
                    onClick={onAction}
                  >
                    导出
                  </Button>
                )}
              />
            </>
          );
        }}
      />
    </>
  );
}

function DeleteButton({ record }: any) {
  return (
    <DeleteAction
      record={record}
      option={{
        title: '确定要删除此用户吗？',
        submitApi: '/User/Delete'
      }}
      actionCom={({ onAction }) => <a onClick={onAction}>删除</a>}
    />
  );
}

function UpdateButton({ record }: any) {
  return (
    <UpdateAction
      record={record}
      option={{
        width: 460,
        detailApi: '/User/Get',
        title: '修改用户2',
        submitApi: { url: '/User/Update' },
        fields: {
          Name: {
            isFillLine: true,
            rules: [{ required: true, message: '请输入姓名' }],
            label: '姓名',
            component: 'Input',
            labelCol: { span: 5 }
          },
          CreateTime: {
            isFillLine: true,
            component: 'Input',
            label: '创建时间',
            labelCol: { span: 5 }
          },
          Picture: {
            isFillLine: true,
            component: 'SingleImgUpload',
            componentProps: {},
            label: '文件上传',
            labelCol: { span: 5 }
          }
          // FileUpload: {
          //   isFillLine: true,
          //   labelCol: { span: 5 },
          //   // rules: [{ required: true, message: '请上传文件' }],
          //   component: 'Upload',
          //   componentProps: {
          //     action: '',
          //     listType: 'picture'
          //   },
          //   label: '文件上传'
          // }
        }
      }}
      actionCom={({ onAction }) => <a onClick={onAction}>修改</a>}
    />
  );
}

function ViewButton({ record }: any) {
  return (
    <ViewAction
      record={record}
      option={{
        width: 460,
        detailApi: '/User/Get',
        title: '查看用户',
        fields: {
          Name: {
            isFillLine: true,
            rules: [{ required: true, message: '请输入姓名' }],
            label: '姓名',
            component: 'Input',
            labelCol: { span: 5 }
          },
          CreateTime: {
            isFillLine: true,
            component: 'Input',
            label: '创建时间',
            labelCol: { span: 5 }
          }
        }
      }}
      actionCom={({ onAction }) => <a onClick={onAction}>查看</a>}
    />
  );
}
