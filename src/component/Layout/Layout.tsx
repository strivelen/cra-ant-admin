import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Avatar, Row, Col, Dropdown, Menu, Divider } from 'antd';
import AdminMenu from './Menu';
const { Content, Footer, Header } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <AdminMenu
        collapsed={collapsed}
        onSelect={({ keyPath }) => {
          // setBreadcrumb(keyPath.reverse());
          console.log('keyPath: ', keyPath);
        }}
      />
      <Layout className="site-layout">
        {/* <Header className="site-header">
            <Row justify="space-between" align="middle">
              <Col>
                <Row align="middle">
                  <Col>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      className: 'site-menu-trigger',
                      onClick: () => setCollapsed(!collapsed)
                    })}
                  </Col>
                  <Col>
                    <LayoutBreadcrumb data={breadcrumb} />
                  </Col>
                </Row>
              </Col>
              <Col>
                <UserAvatarAndName />
              </Col>
            </Row>
          </Header> */}
        <Divider style={{ height: 6, margin: 0, borderWidth: 0 }} />
        <Content
          style={{
            padding: '8px 16px',
            overflow: 'initial',
            backgroundColor: '#fff'
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer</Footer>
      </Layout>
    </Layout>
  );
}
