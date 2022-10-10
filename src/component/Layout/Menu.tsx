import { useState, useEffect, useRef } from 'react';
import {
  useNavigate,
  useLocation,
  matchPath,
  matchRoutes,
  Location,
  To
} from 'react-router-dom';
import { Menu } from 'antd';
import { useMenuData, useOpenKeysState } from 'hooks/useMenu';
import { MenuItem } from 'app/config';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useAppDispatch } from 'app/hooks';
import { setBreadcrumb } from 'features/layout/layoutSlice';
import { routes } from 'app/routes';

export default function LayoutMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const menuData = useMenuData();
  const expandMenuDataRef = useRef<MenuItem[]>([]);

  const { openKeys, onOpenChange } = useOpenKeysState(menuData);
  const [selectedKeys, setselectedKeys] = useState<string[] | undefined>();

  useEffect(() => {
    if (menuData.length > 0) {
      // 展开菜单树结构数据
      expandMenuDataRef.current = expandTreeStructureMenu([...menuData]);
      // 设置菜单初始化状态
      const menuStatus = getMenuStatus(expandMenuDataRef.current, location);
      setselectedKeys(menuStatus.selectKeys);
      onOpenChange(menuStatus.openKeys);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuData]);

  useEffect(() => {
    if (expandMenuDataRef.current.length > 0) {
      const menuStatus = getMenuStatus(expandMenuDataRef.current, location);
      setselectedKeys(menuStatus.selectKeys);
      menuStatus.openKeys.length > 0 && onOpenChange(menuStatus.openKeys);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    // 自动渲染 breadcrumb
    if (!selectedKeys || selectedKeys.length === 0) {
      return;
    }
    const currentOpenKeys = getOpenKeys([], selectedKeys[0]);
    let breadcrumbPath: string[] = [];
    if (currentOpenKeys.length !== 0) {
      breadcrumbPath = currentOpenKeys.map((key) => {
        const menuItem = expandMenuDataRef.current.find(
          (menuItem) => key === menuItem.key
        ) as MenuItem;
        return menuItem.Name;
      });
    }
    const breadcrumbFouces = expandMenuDataRef.current.find(
      (menuitem) => menuitem.key === (selectedKeys || [])[0]
    ) as MenuItem;
    const breadcrumb = [...breadcrumbPath, breadcrumbFouces.Name];
    dispatch(setBreadcrumb(breadcrumb));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys]);

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      onClick={({ key, keyPath, domEvent }) => {
        setselectedKeys([key]);
        const pageUrl = (
          expandMenuDataRef.current.find((item) => item.key === key) || {}
        ).Url as To;
        navigate(pageUrl);
      }}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={generateMenuItems(menuData)}
    />
  );
}

/**
 * 菜单Icon
 * @param param0 iconfont name
 * @returns
 */
function MenuIcon({ name }: { name: string | undefined }) {
  if (!name) return null;
  return (
    <span
      className="anticon ant-menu-item-icon"
      style={{ verticalAlign: 'top' }}
    >
      <i
        className={`iconfont ${name}`}
        style={{ fontSize: 26, verticalAlign: 'sub', marginLeft: -5 }}
      />
    </span>
  );
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
const getMenuStatus: GetMenuStatus = function (expandMenuList, location) {
  const selectKey = getSelectKeys(expandMenuList, location);
  return {
    selectKeys: selectKey ? [selectKey] : [],
    openKeys: getOpenKeys([], selectKey)
  };
};

// 定位菜单selectKeys
function getSelectKeys(expandMenuList: MenuItem[], location: Location): string {
  let currentMenuItemConfig = expandMenuList.find(
    (item) => item.Url === location.pathname
  );
  if (!currentMenuItemConfig) {
    // 此分支是为了处理菜单路由使用的是动态路由的情况
    const _routes = matchRoutes(routes, location);
    const routeModel = _routes
      ?.reduce(
        (model, { route }) =>
          `${model}${route.path === '/' ? '' : '/'}${route.path}`,
        ''
      )
      .replace(/\/\//g, '/');
    currentMenuItemConfig = expandMenuList.find((menuItem) => {
      return !!matchPath(routeModel || '', menuItem.Url || '');
    });
  }
  return currentMenuItemConfig?.key || '';
}

// 定位菜单openKeys(递归解析selectKey)
function getOpenKeys(keys: string[] = [], key: string): string[] {
  if (!key || key.split('-').length === 2) {
    return keys;
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
function expandTreeStructureMenu(data: MenuItem[]) {
  let newData: MenuItem[] = [];
  data.forEach((item) => {
    if (item.Children) {
      const curItem = { ...item };
      const child = expandTreeStructureMenu(curItem.Children || []);
      delete curItem.Children;
      newData = [...newData, curItem, ...child];
    } else {
      newData.push(item);
    }
  });
  return newData;
}
