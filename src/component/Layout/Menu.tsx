import { useState, useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  matchPath,
  matchRoutes,
  Location
} from 'react-router-dom';
import { Menu } from 'antd';
import { useMenuData, useOpenKeys } from 'hooks/useMenu';
import Config, { MenuItem } from 'app/config';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

export default function LayoutMenu() {
  const navigate = useNavigate();
  const menuData = useMenuData();
  const expandMenuData = expandTreeStructure([...menuData]);
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
  }, [menuData]);

  return (
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
        onClick={({ key, keyPath, domEvent }) => {
          setselectedKeys([key]);
          const pageUrl = (
            expandMenuData.find((item) => item.key === key) || {}
          ).Url as string;
          navigate(pageUrl);
        }}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={generateMenuItems(menuData)}
      />
    </div>
  );
}

/**
 * 菜单Icon
 * @param param0 iconfont name
 * @returns
 */
function MenuIcon({ name }: { name: string | undefined }) {
  if (!name) return null;
  return <span className={`iconfont ${name}`} style={{ marginRight: 6 }} />;
}

/**
 * 菜单配置数据生成Menu组件用数据
 * @param {MenuItem[]} data
 * @returns
 */
const generateMenuItems = (data: MenuItem[]): ItemType[] => {
  const menu: ItemType[] = [];
  data.forEach((item) => {
    let children;
    if (item.Children) {
      children = generateMenuItems(item.Children);
    }
    menu.push({
      key: item.key as string,
      label: item.Name,
      icon: <MenuIcon name={item.Icon} />,
      children
    });
  });
  return menu;
};

interface GetMenuStatus {
  (menuData: MenuItem[], location: Location): {
    selectKeys: string[];
    openKeys: string[];
  };
}

// 根据路径匹配菜单状态
const getMenuStatus: GetMenuStatus = function (menuData, location) {
  // 把菜单树状结构展平
  const menuLists: MenuItem[] = [];
  function getMenuList(menuData: MenuItem[]) {
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

function getSelectKeys(menuLists: MenuItem[], location: Location): string {
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

/**
 * 菜单树结构展开
 */
function expandTreeStructure(data: MenuItem[]) {
  let newData: MenuItem[] = [];
  data.forEach((item) => {
    if (item.Children) {
      const curItem = { ...item };
      const child = expandTreeStructure(curItem.Children || []);
      delete curItem.Children;
      newData = [...newData, curItem, ...child];
    } else {
      newData.push(item);
    }
  });
  return newData;
}
