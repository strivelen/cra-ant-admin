import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Row, Col } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface LoadingParams {
  height?: string | number;
}

/**
 * 正在加载图标
 * @param {LoadingParams} param0
 * @returns
 */
export default function Loading({ height }: LoadingParams) {
  return (
    <Row align="middle" justify="center" style={{ height: height || '100vh' }}>
      <Col>
        <Spin indicator={antIcon} tip="加载中..." />
      </Col>
    </Row>
  );
}
