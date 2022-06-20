import { useState, useEffect } from 'react';
import { fetchUserMenu } from 'api/User';
import Config from 'app/config';
import type { MenuItem } from 'app/config';

/**
 * 自动添加菜单数据唯一key，如：menu-0 menu-1 menu-1-0 menu-1-1
 * @param data
 * @param prefix
 * @returns
 */
const addMenuKeys = (data: MenuItem[], prefix: string) => {
  const menu: MenuItem[] = [];
  data.forEach((item, index) => {
    const key = prefix + '-' + index;
    if (item.Children) {
      item.Children = addMenuKeys(item.Children, key);
    }
    menu.push({ ...item, key });
  });
  return menu;
};

/**
 * 获取菜单数据
 * @returns
 */
export function useMenuData() {
  const [menuData, setMenuData] = useState<ExpandRecursively<MenuItem[]>>(
    addMenuKeys(Config.menu, 'menu')
  );
  useEffect(() => {
    (async () => {
      if (Config.isUseServerMenu) {
        const menu = await fetchUserMenu();
        setMenuData(addMenuKeys(menu, 'menu'));
      }
    })();
  }, []);

  return menuData;
}

/**
 * 菜单折叠逻辑
 * @param { MenuItem[] } menuData
 * @returns
 */
export function useOpenKeys(menuData: MenuItem[]) {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const rootSubmenuKeys = menuData
    .filter((item) => item.Children && item.Children.length > 0)
    .map((item) => item.key);

  // 处理菜单折叠
  const onOpenChange = ((keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(String(latestOpenKey)) === -1) {
      setOpenKeys(keys);
    } else {
      const newKeys = latestOpenKey ? [latestOpenKey] : [];
      setOpenKeys(newKeys);
    }
  }) as (openKeys: string[]) => void;

  return { openKeys, onOpenChange };
}
