import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Row, Col } from 'antd';
import LayoutBreadcrumb from './Breadcrumb';
const { Header } = Layout;

interface LayoutHeaderParams {
  collapsed: boolean;
  onCollapsed(): void;
}

export default function LayoutHeader({
  collapsed,
  onCollapsed
}: LayoutHeaderParams) {
  return (
    <Header className="site-header">
      <Row justify="space-between" align="middle">
        <Col>
          <Row align="middle">
            <Col>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'site-menu-trigger',
                  onClick: () => onCollapsed()
                }
              )}
            </Col>
            <Col>
              <LayoutBreadcrumb />
            </Col>
          </Row>
        </Col>
        <Col>{/* <UserAvatarAndName /> */}</Col>
      </Row>
    </Header>
  );
}
