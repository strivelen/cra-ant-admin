import { useState, useContext } from 'react';
import { Form, Modal, message, UploadProps } from 'antd';
import axios from 'util/axios';
import { CRUDTemplateContext } from '../CRUDTemplate';
import { useAppSelector } from 'app/hooks';
import { selectLoading } from 'features/loading/loadingSlice';
import RenderFieldsConfig, { FieldsType } from 'component/RenderFieldsConfig';
import { mapFileListToApiFileFields } from 'component/FormItem/Upload';
import { getApiTypesValue } from 'util/utils';
const { success } = message;

interface AddModalProps {
  title: string;
  visible: boolean;
  onCancel(): void;
  onOk(): void;
  fields: FieldsType;
  submitApi: Api;
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
  const fieldKeys: string[] = Object.keys(fields);
  const [form] = Form.useForm();

  // 提交
  const onFinish = async (values: object) => {
    const fileFields = fieldKeys.find(
      (field) => fields[field].component === 'Upload'
    ) as keyof typeof values;
    values[fileFields] = mapFileListToApiFileFields(
      values[fileFields] as UploadProps['fileList']
    );
    const { url, params } = getApiTypesValue(submitApi);
    await axios.post(url, { ...params, ...values });
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
  option,
  actionCom
}: ActionProps<AddModalProps>) {
  const [visible, setVisible] = useState(false);
  const { refTable } = useContext(CRUDTemplateContext);
  const onShowModal = () => setVisible(true);
  return (
    <>
      {typeof actionCom === 'function' && actionCom({ onAction: onShowModal })}
      <AddModal
        {...option}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          refTable?.current?.onRefresh(true);
        }}
      />
    </>
  );
}
