/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, matchPath, Pathname } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import useMenuData from 'hooks/useMenuData';
import Config, { MenuItem as TMenuItem } from 'app/config';
const { Sider } = Layout;
const { SubMenu } = Menu;

interface LayoutMenuParams {
  collapsed: boolean;
  onSelect(p: { keyPath: string[] }): void;
}

export default function LayoutMenu({
  collapsed = false,
  onSelect
}: LayoutMenuParams) {
  const menuData = useMenuData();
  const location = useLocation();
  const rootSubmenuKeys = menuData
    .filter((item) => item.Children && item.Children.length > 0)
    .map((item) => item.Name);
  const [selectedKeys, setselectedKeys] = useState<string[] | undefined>();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 设置菜单相关状态
  const setMenuStatus = (data: TMenuItem[], pathname: Pathname) => {
    const keyPath = getMenuKeyPath(data, pathname) || [];
    onSelect({ keyPath: [...keyPath] });
    setselectedKeys([keyPath[0]]);
    setOpenKeys(keyPath.slice(1) || []);
  };

  useEffect(() => {
    if (menuData.length > 0) {
      setMenuStatus(menuData, location.pathname);
    }
  }, [menuData, location]);

  // 处理菜单折叠
  const onOpenChange = ((keys) => {
    // 这段逻辑表示只控制第一层的展开与收起。
    const latestOpenKey: string =
      keys.find((key) => openKeys.indexOf(key) === -1) || '';
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      const newKeys = latestOpenKey ? [latestOpenKey] : [];
      setOpenKeys(newKeys);
    }
  }) as (openKeys: string[]) => void;
  const menuCom = useMemo(
    () => (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Menu.Item key="首页" icon={<span className="iconfont icon-huiyuan" />}>
          <Link to="/">首页</Link>
        </Menu.Item>
        {menuData.map((item) => {
          return <MenuItem key={item.Name} data={item} />;
        })}
      </Menu>
    ),
    [openKeys, menuData]
  );
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
        {menuCom}
      </div>
    </Sider>
  );
}

// 渲染菜单
function MenuItem({ data }: { data: TMenuItem }) {
  if (data.Children) {
    return (
      <SubMenu
        key={data.Name}
        title={data.Name}
        icon={<span className="iconfont icon-huiyuan" />}
      >
        {data.Children.map((item) => {
          return <MenuItem key={item.Name} data={item} />;
        })}
      </SubMenu>
    );
  }
  return (
    <Menu.Item
      key={data.Name}
      icon={<span className="iconfont icon-huiyuan" />}
    >
      <Link to={{ pathname: data.Url }}>{data.Name}</Link>
    </Menu.Item>
  );
}

// 根据路径匹配菜单状态
function getMenuKeyPath(
  menuData: TMenuItem[],
  pathname: Pathname
): string[] | undefined {
  // 把树状结构展平
  const menuLists = [] as (TMenuItem & { id: string })[];
  function getMenuList(menuData: TMenuItem[], level = '') {
    menuData.forEach((item, index) => {
      const id = `${level}-${index}`;
      menuLists.push({
        ...item,
        id
      });
      if (item.Children) {
        getMenuList(item.Children, id);
      }
    });
  }
  getMenuList(menuData);
  let route = menuLists.find((item) => item.Url === pathname);
  if (!route) {
    const currentPagePathModel = (
      Config.routes.find(({ path }) => {
        return !!matchPath(pathname, path || '');
      }) || {}
    ).path;
    route = menuLists.find(
      (menuItem) => !!matchPath(menuItem.Url || '', currentPagePathModel || '')
    );
  }
  if (!route) return;
  return inferKeyPath(route, menuLists, [route.Name]);
}

// 推导出菜单路径
function inferKeyPath(
  route: TMenuItem & { id: string },
  routelist: (TMenuItem & { id: string })[],
  init: string[] = []
): any {
  const routeId = route.id;
  if (routeId.split('-').length <= 2) {
    return init; // 数组第一项是页面菜单选中项，后边的每一项依次为树结构的末枝到根节点的路径。
  } else {
    const routeIdArr = routeId.split('-');
    routeIdArr.pop();
    const upLevelId = routeIdArr.join('-');
    const upLevelRoute = (routelist.find((item) => item.id === upLevelId) ||
      {}) as TMenuItem & { id: string };
    return inferKeyPath(
      upLevelRoute,
      routelist,
      init.concat([upLevelRoute.Name])
    );
  }
}
