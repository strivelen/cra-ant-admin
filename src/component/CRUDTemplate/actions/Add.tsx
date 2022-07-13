import { useState, useContext } from 'react';
import { Form, Modal, message } from 'antd';
import axios from 'util/axios';
import { CRUDTemplateContext } from '../CRUDTemplate';
import { useAppSelector } from 'app/hooks';
import { selectLoading } from 'features/loading/loadingSlice';
import RenderFieldsConfig from 'component/RenderFieldsConfig';
const { success } = message;

interface AddModalProps {
  title: string;
  visible: boolean;
  onCancel(): void;
  onOk(): void;
  fields: any;
  submitApi: string;
  width?: number;
}

export function AddModal({
  title,
  visible,
  onCancel,
  onOk,
  fields,
  submitApi,
  width = 960
}: AddModalProps) {
  const loading = useAppSelector(selectLoading);
  const [form] = Form.useForm();

  // 提交
  const onFinish = async (values: object) => {
    await axios.post(submitApi, { ...values });
    success('新增成功');
    onCancel();
    onOk();
    setTimeout(() => {
      form.resetFields();
    }, 300);
  };

  return (
    <Modal
      centered
      title={title}
      visible={visible}
      confirmLoading={loading}
      destroyOnClose={true}
      onCancel={() => {
        onCancel();
        setTimeout(() => {
          form.resetFields();
        }, 300);
      }}
      width={width}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={(values) => onFinish(values)}>
        <RenderFieldsConfig fields={fields} />
      </Form>
    </Modal>
  );
}

export default function AddAction({
  modalOption,
  actionCom
}: ActionProps<AddModalProps>) {
  const [visible, setVisible] = useState(false);
  const { refTable } = useContext(CRUDTemplateContext);
  const onShowModal = () => setVisible(true);
  return (
    <>
      {typeof actionCom === 'function' && actionCom({ onShowModal })}
      <AddModal
        {...modalOption}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          refTable?.current?.onRefresh(true);
        }}
      />
    </>
  );
}
