import {
  Ref,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  useContext
} from 'react';
import { Form, Modal, message } from 'antd';
import axios from 'util/axios';
import { CRUDTemplateContext } from '../CRUDTemplate';
import RenderFieldsConfig, { Fields } from 'component/RenderFieldsConfig';
import { useAppSelector } from 'app/hooks';
import { selectLoading } from 'features/loading/loadingSlice';

interface RefUpdateModalProps {
  getDefaultData(record: object): void;
}

const { success, warning } = message;

interface UpdateModalProps {
  title: string;
  visible: boolean;
  onCancel(): void;
  onOk(): void;
  fields: Fields;
  detailApi: string;
  submitApi: string;
  width?: number;
}

function UpdateModal(
  {
    title,
    visible,
    onCancel,
    onOk,
    fields,
    submitApi,
    detailApi,
    width = 960
  }: UpdateModalProps,
  ref: Ref<RefUpdateModalProps>
) {
  const [form] = Form.useForm();
  const fieldKeys: string[] = Object.keys(fields);
  const loading = useAppSelector(selectLoading);
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

  // 提交
  const onFinish = async (values: object) => {
    await axios.post(submitApi, values);
    success('修改成功');
    onCancel();
    onOk();
    setTimeout(() => {
      form.resetFields();
    }, 300);
  };
  return (
    <Modal
      centered
      destroyOnClose={true}
      title={title}
      visible={visible}
      confirmLoading={loading}
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

const NewUpdateModal = forwardRef(UpdateModal);

export default function UpdateAction({
  record,
  option,
  actionCom
}: ActionProps<UpdateModalProps>) {
  const { refTable } = useContext(CRUDTemplateContext);
  const [visible, setVisible] = useState(false);
  const refUpdateModal = useRef<RefUpdateModalProps>(null);

  const onShowModal = () => {
    setVisible(true);
    refUpdateModal?.current?.getDefaultData(record);
  };

  return (
    <>
      {typeof actionCom === 'function' && actionCom({ onAction: onShowModal })}
      <NewUpdateModal
        {...option}
        ref={refUpdateModal}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => refTable?.current?.onRefresh(false)}
      />
    </>
  );
}
