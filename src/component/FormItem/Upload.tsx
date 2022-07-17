import { Upload as AntUpload, Button, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function Upload(props: UploadProps) {
  return (
    <AntUpload {...props}>
      <Button icon={<UploadOutlined />}>点击上传</Button>
    </AntUpload>
  );
}

// 将接口返回的文件字段值结构转换为Upload组件用数据结构
export function mapApiFileFieldsToFileList(apiFileFieldsValue: any) {
  // 此处处理数据转换
  let localFileFieldsValue: UploadProps['fileList'] = apiFileFieldsValue;
  return localFileFieldsValue;
}

// 将Upload组件fileList value转换为提交接口接受的的文件字段值结构
export function mapFileListToApiFileFields(
  localFileFieldsValue: UploadProps['fileList']
) {
  // 此处处理数据转换
  let apiFileFieldsValue = localFileFieldsValue?.filter(
    (item) => item.status === 'done'
  );
  return apiFileFieldsValue as never;
}
