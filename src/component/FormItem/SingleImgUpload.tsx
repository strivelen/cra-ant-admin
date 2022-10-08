import { useState } from 'react';
import { Upload, message, Row, Col, Button, UploadFile } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from 'app/hooks';
import { selectToken } from 'features/user/userSlice';
const config = require('app/config');

function beforeUpload(file: UploadFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只允许上传JPG/PNG文件，请重新选择!');
  }
  const isLt10M = (file.size || 0) / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('图片必须小于10MB!');
  }
  return isJpgOrPng && isLt10M;
}

function handlePreview(file: UploadFile) {
  window.open(file.url);
}

interface SingleFileUploadProps {
  imageUrl: string;
  onChange: (fileUrl: string) => void;
}

export default function SingleImgUpload({
  imageUrl,
  onChange
}: SingleFileUploadProps) {
  const token = useAppSelector(selectToken) as string;
  const [loading, setLoading] = useState(false);
  const uploadFile = async ({
    file,
    fileList
  }: {
    file: UploadFile;
    fileList: UploadFile[];
  }) => {
    if (file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (file.status === 'removed' || !file.status) {
      setLoading(false);
      onChange('');
      return;
    }
    if (file.status === 'done') {
      setLoading(false);
      const response = file.response;
      if (response.Code === 200) {
        onChange(response.Data[0]);
      } else {
        message.error(response.Message);
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>选择图片</div>
    </div>
  );

  if (imageUrl) {
    return (
      <Row gutter={12} align="middle">
        <Col>
          <img
            src={imageUrl}
            alt="图片"
            style={{ height: 100, cursor: 'pointer', marginBottom: 20 }}
            onClick={() => window.open(imageUrl)}
          />
        </Col>
        <Col>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              size="small"
              type="primary"
              onClick={() => window.open(imageUrl)}
            >
              查看原图
            </Button>
            <Button
              style={{ marginTop: 10 }}
              size="small"
              danger
              onClick={() => onChange('')}
            >
              删除图片
            </Button>
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <Upload
      listType="picture-card"
      accept="image/*"
      action={config.apiHosts + '/User/ProductImg'}
      method="POST"
      headers={{ [config.apiSessionKey]: token }}
      multiple={false}
      onChange={uploadFile}
      beforeUpload={(file) => beforeUpload(file)}
      onPreview={handlePreview}
    >
      {uploadButton}
    </Upload>
  );
}
