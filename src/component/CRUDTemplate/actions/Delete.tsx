import { useContext } from 'react';
import { Modal, message } from 'antd';
import axios from 'util/axios';
import { CRUDTemplateContext } from '../CRUDTemplate';

const confirm = Modal.confirm;

interface ConfirmDeleteProps {
  title?: string;
  submitApi: string;
  params?: object;
  cb?(): void;
}

/**
 * 确认删除弹框
 */
export function confirmDelete({
  title,
  submitApi,
  params,
  cb
}: ConfirmDeleteProps) {
  confirm({
    centered: true,
    title: title || '确定要删除此数据吗？',
    onOk() {
      (async () => {
        if (!submitApi || !params) {
          return message.warning('请指定参数: submitApi 或 params！');
        }
        await axios.post(submitApi, params);
        message.success('删除成功');
        cb && cb();
      })();
    }
  });
}

export default function DeleteAction({
  record,
  option,
  actionCom
}: ActionProps<ConfirmDeleteProps>) {
  const { refTable } = useContext(CRUDTemplateContext);
  const cb = () => refTable?.current?.onRefresh(false);
  const onShowModal = () =>
    confirmDelete({
      ...option,
      params: option.params || { ID: record.ID },
      cb
    });
  return actionCom && actionCom({ onAction: onShowModal });
}
