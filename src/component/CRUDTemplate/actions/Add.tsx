import React, { useState, useContext, useRef, ReactNode } from 'react';
import { Form, Row, Col, Modal, message, Input } from 'antd';
import axios from 'util/axios';
import { CRUDTemplateContext } from '../CRUDTemplate';
import { useAppSelector } from 'app/hooks';
import { selectLoading } from 'features/loading/loadingSlice';
import * as FormItems from 'component/FormItem';
const { success } = message;

interface AddModalProps {
  title: string;
  visible: boolean;
  onCancel(): void;
  onOk(): void;
  fields?: any;
  submitApi: string;
}

export function AddModal({
  title,
  visible,
  onCancel,
  onOk,
  fields,
  submitApi
}: AddModalProps) {
  const loading = useAppSelector(selectLoading);
  const [form] = Form.useForm();

  // 提交
  const onFinish = async (values: object) => {
    try {
      console.log('================== add-form-values ================');
      console.log(values);
      // setLoading(true);
      await axios.post(submitApi, { ...values });
      success('新增成功');
      onCancel();
      onOk();
      setTimeout(() => {
        form.resetFields();
        // setLoading(false);
      }, 300);
    } catch (e) {
      console.log(`============= 进入catch ==============`);
      console.log(e);
    }
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
      width={960}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={(values) => onFinish(values)}>
        <Form.Item label="测试" name="test">
          <Input />
        </Form.Item>
        {/* <Row>
          <RenderFields fields={fieldsConfig} form={form} />
        </Row> */}
      </Form>
    </Modal>
  );
}

interface ActionComProps {
  onShowModal(): void;
}

interface AddActionProps {
  modalOption: Omit<AddModalProps, 'visible' | 'onOk' | 'onCancel'>;
  actionCom(p: ActionComProps): void;
}

export default function AddAction({ modalOption, actionCom }: AddActionProps) {
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
