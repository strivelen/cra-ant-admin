import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

/**
 * Layout面包屑
 * @param {Array<String | {name: String; path: String}>} data
 * @returns
 */
export default function LayoutBreadcrumb() {
  const data = [{ name: '首页', path: '/' }, '订单'];
  return data.length > 0 ? (
    <Breadcrumb separator=">" style={{ margin: '0 16px ' }}>
      {data.map((item) => {
        if (typeof item === 'object') {
          return (
            <Breadcrumb.Item key={item.name}>
              <Link to={item.path}>{item.name}</Link>
            </Breadcrumb.Item>
          );
        }
        return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
      })}
    </Breadcrumb>
  ) : (
    <div style={{ height: 16 }} />
  );
}
