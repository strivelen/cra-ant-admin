import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Divider } from 'antd';
import LayoutMenu from './Menu';
import LayoutHeader from './Header';
const { Sider, Content, Footer } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout hasSider>
      <Sider
        width={260}
        collapsedWidth={80}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <LayoutMenu />
      </Sider>
      <Layout className="site-layout">
        <LayoutHeader
          collapsed={collapsed}
          onCollapsed={() => setCollapsed(!collapsed)}
        />
        <Divider style={{ height: 6, margin: 0, borderWidth: 0 }} />
        <Content className="site-content">
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer</Footer>
      </Layout>
    </Layout>
  );
}
