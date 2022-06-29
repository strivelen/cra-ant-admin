import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Row, Col, Avatar } from 'antd';
import { persistor } from 'app/store';
import { selectUserInfo } from 'features/user/userSlice';
import { useAppSelector } from 'app/hooks';

export default function PersonalCenterEntry() {
  const userInfo = useAppSelector(selectUserInfo);
  return (
    <Dropdown overlay={<PersonalMenu />} trigger={['click', 'hover']}>
      <Row gutter={10} style={{ cursor: 'pointer' }}>
        <Col>
          <Avatar icon={<UserOutlined />} />
        </Col>
        <Col>{userInfo.Name || 'Admin'}</Col>
      </Row>
    </Dropdown>
  );
}

function PersonalMenu() {
  return (
    <Menu
      style={{ width: 100, textAlign: 'center' }}
      onClick={(e) => {
        if (e.key === 'logout') {
          persistor.purge(); // 清楚硬盘（如：localStorage）中的所有数据
        }
      }}
      items={[
        // 个人菜单示例
        { key: '0', label: '我的信息' },
        { key: '1', label: '修改密码' },
        { type: 'divider' },
        { key: 'logout', danger: true, label: '退出登录' }
      ]}
    />
  );
}
