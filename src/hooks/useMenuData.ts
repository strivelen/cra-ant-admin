import { useState, useEffect } from 'react';
import { fetchUserMenu } from 'api/User';
import Config from 'app/config';
import type { MenuItem } from 'app/config';

export default function useMenuData() {
  const [menuData, setMenuData] = useState<MenuItem[]>(Config.menu);

  useEffect(() => {
    (async () => {
      if (Config.isUseServerMenu) {
        const menu = await fetchUserMenu();
        setMenuData(menu);
      }
    })();
  }, []);

  return menuData;
}
