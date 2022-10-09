import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Divider } from 'antd';
import LayoutMenu from './Menu';
import LayoutHeader from './Header';
import Loading from 'component/Loading';
import { useAppSelector } from 'app/hooks';
import Config from 'app/config';
const { Sider, Content, Footer } = Layout;

export default function AdminLayout() {
  const { collapsed } = useAppSelector((state) => state.layout);
  return (
    <Layout hasSider>
      <Sider
        width={260}
        collapsedWidth={80}
        trigger={null}
        // collapsible
        collapsed={collapsed}
      >
        <div
          style={{
            overflowY: 'auto',
            height: '100vh',
            position: 'sticky',
            top: 0
          }}
        >
          <div className="logo">
            <p className="logo_text">{collapsed ? 'Logo' : Config.appName}</p>
          </div>
          <LayoutMenu />
        </div>
      </Sider>
      <Layout className="site-layout">
        <LayoutHeader />
        <Divider style={{ height: 6, margin: 0, borderWidth: 0 }} />
        <Content className="site-content">
          <Suspense fallback={<Loading height="100%" />}>
            <Outlet />
          </Suspense>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer</Footer>
      </Layout>
    </Layout>
  );
}
