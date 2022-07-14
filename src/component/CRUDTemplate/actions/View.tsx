import { useImperativeHandle, forwardRef, useState, useRef, Ref } from 'react';
import { Form, Modal, message } from 'antd';
import axios from 'util/axios';
import RenderFieldsConfig from 'component/RenderFieldsConfig';
const { warning } = message;

interface RefViewModalProps {
  getDefaultData(record: object): void;
}

interface ViewModalProps {
  visible: boolean;
  onCancel(): void;
  title: string;
  detailApi: string;
  fields: any;
  width?: number;
}

/**
 * 查看弹框
 */
function ViewModal(
  {
    visible,
    onCancel,
    title,
    detailApi,
    fields = {},
    width = 960
  }: ViewModalProps,
  ref: Ref<RefViewModalProps>
) {
  const fieldKeys = Object.keys(fields);
  const [form] = Form.useForm();

  // 获取修改时的默认数据
  const getDefaultData: (record: { [propName: string]: any }) => void = async (
    record
  ) => {
    if (!detailApi) {
      return warning('请配置参数：detailApi');
    }
    const data: any = await axios.post(detailApi, { ID: record.ID });
    const defaultData = {} as { [propName: string]: string };
    fieldKeys.forEach((item) => {
      defaultData[item] = data[item];
    });
    form.setFieldsValue(defaultData);
  };

  useImperativeHandle(ref, () => ({
    getDefaultData
  }));

  return (
    <Modal
      centered
      destroyOnClose={true}
      title={title}
      visible={visible}
      footer={null}
      onCancel={() => {
        onCancel();
        setTimeout(() => {
          form.resetFields();
        }, 300);
      }}
      width={width}
      onOk={() => form.submit()}
    >
      <Form form={form}>
        <RenderFieldsConfig fields={fields} defaultProps={{ disabled: true }} />
      </Form>
    </Modal>
  );
}

const NewViewModal = forwardRef(ViewModal);

export default function ViewAction({
  record,
  option,
  actionCom
}: ActionProps<ViewModalProps>) {
  const [visible, setVisible] = useState(false);
  const refNewViewModal = useRef<RefViewModalProps>(null);

  const onShowModal = () => {
    setVisible(true);
    refNewViewModal?.current?.getDefaultData(record);
  };

  return (
    <>
      {typeof actionCom === 'function' && actionCom({ onAction: onShowModal })}
      <NewViewModal
        {...option}
        ref={refNewViewModal}
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </>
  );
}
