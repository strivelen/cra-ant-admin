/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Link,
  useLocation,
  matchPath,
  matchRoutes,
  Location
} from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { useMenuData, useOpenKeys } from 'hooks/useMenu';
import Config, { MenuItem as TMenuItem } from 'app/config';
const { Sider } = Layout;
const { SubMenu } = Menu;

interface LayoutMenuParams {
  collapsed: boolean;
  onSelect(p: { keyPath: string[] }): void;
}

export default function LayoutMenu({ collapsed = false }: LayoutMenuParams) {
  const menuData = useMenuData();
  const location = useLocation();
  const { openKeys, onOpenChange } = useOpenKeys(menuData);
  const [selectedKeys, setselectedKeys] = useState<string[] | undefined>();

  useEffect(() => {
    // 设置菜单相关状态
    if (menuData.length > 0) {
      const menuStatus = getMenuStatus(menuData, location);
      setselectedKeys(menuStatus.selectKeys);
      onOpenChange(menuStatus.openKeys);
    }
  }, [menuData, location]);

  const MenuItems = menuData.map((item) => {
    return <MenuItem key={item.key} data={item} />;
  });

  return (
    <Sider width={260} trigger={null} collapsible collapsed={collapsed}>
      <div
        style={{
          overflowY: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          <Menu.Item key="首页" icon={<MenuIcon name="icon-bofang" />}>
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="订单管理" icon={<MenuIcon name="icon-ziliao" />}>
            <Link to="/order">订单管理</Link>
          </Menu.Item>
          {MenuItems}
        </Menu>
      </div>
    </Sider>
  );
}

// 渲染菜单
function MenuItem({ data }: { data: TMenuItem }) {
  if (data.Children) {
    return (
      <SubMenu title={data.Name} icon={<MenuIcon name={data.Icon} />}>
        {data.Children.map((item) => {
          return <MenuItem key={item.key} data={item} />;
        })}
      </SubMenu>
    );
  }
  return (
    <Menu.Item icon={<MenuIcon name={data.Icon} />}>
      <Link to={{ pathname: data.Url }}>{data.Name}</Link>
    </Menu.Item>
  );
}

function MenuIcon({ name }: { name: string | undefined }) {
  if (!name) return null;
  return <span className={`iconfont ${name}`} />;
}

interface GetMenuStatus {
  (menuData: TMenuItem[], location: Location): {
    selectKeys: string[];
    openKeys: string[];
  };
}

// 根据路径匹配菜单状态
const getMenuStatus: GetMenuStatus = function (menuData, location) {
  // 把菜单树状结构展平
  const menuLists = [] as TMenuItem[];
  function getMenuList(menuData: TMenuItem[]) {
    menuData.forEach((item) => {
      menuLists.push(item);
      if (item.Children) {
        getMenuList(item.Children);
      }
    });
  }
  getMenuList(menuData);

  const selectKey = getSelectKeys(menuLists, location);
  return {
    selectKeys: selectKey ? [selectKey] : [],
    openKeys: getOpenKeys([], selectKey)
  };
};

function getSelectKeys(menuLists: TMenuItem[], location: Location): string {
  let currentMenuItemConfig = menuLists.find(
    (item) => item.Url === location.pathname
  );
  if (!currentMenuItemConfig) {
    // 此分支是为了处理菜单路由使用的是动态路由的情况
    const routes = matchRoutes(Config.routes, location);
    const routeModel = routes
      ?.reduce(
        (model, { route }) =>
          `${model}${route.path === '/' ? '' : '/'}${route.path}`,
        ''
      )
      .replace(/\/\//g, '/');
    currentMenuItemConfig = menuLists.find((menuItem) => {
      return !!matchPath(routeModel || '', menuItem.Url || '');
    });
  }
  return currentMenuItemConfig?.key || '';
}

function getOpenKeys(keys: string[] = [], key: string): string[] {
  if (!key) {
    return keys;
  }

  if (key.split('-').length === 2) {
    return keys.indexOf(key) === -1 ? [...keys, key] : keys;
  }
  const selectKeyParse = key.split('-');
  const parentDirKey = selectKeyParse
    .slice(0, selectKeyParse.length - 1)
    .join('-');
  keys.push(parentDirKey);
  return getOpenKeys(keys, parentDirKey);
}
