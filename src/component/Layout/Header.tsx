import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Row, Col } from 'antd';
import LayoutBreadcrumb from './Breadcrumb';
import PersonalCenterEntry from './PersonalCenterEntry';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setCollapsed } from 'features/layout/layoutSlice';
const { Header } = Layout;

export default function LayoutHeader() {
  const dispatch = useAppDispatch();
  const { collapsed } = useAppSelector((state) => state.layout);
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
                  onClick: () => dispatch(setCollapsed(!collapsed))
                }
              )}
            </Col>
            <Col>
              <LayoutBreadcrumb />
            </Col>
          </Row>
        </Col>
        <Col style={{ marginRight: 30 }}>
          <PersonalCenterEntry />
        </Col>
      </Row>
    </Header>
  );
}
