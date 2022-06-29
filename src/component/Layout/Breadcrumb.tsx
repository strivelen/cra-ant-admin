import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { selectBreadcrumb } from 'features/layout/layoutSlice';

/**
 * Layout面包屑
 * @param {Array<String | {name: String; path: String}>} data
 * @returns
 */
export default function LayoutBreadcrumb() {
  const breadcrumb = useAppSelector(selectBreadcrumb);
  return breadcrumb.length > 0 ? (
    <Breadcrumb separator=">" style={{ margin: '0 16px ' }}>
      {breadcrumb.map((item) => {
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
