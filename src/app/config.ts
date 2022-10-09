import { Pathname } from 'react-router-dom';

const config: Config = {
  appName: '后台管理系统',
  apiHosts:
    'https://www.fastmock.site/mock/d6f0134049a0e22b01d7aae6fafc9045/api', // 仅供演示用
  // apiHosts: 'https://test.baidu.com/api', // 测试线
  // apiHosts: 'https://www.baidu.com/api',  // 正式线
  apiTimeout: 30000,
  apiSessionKey: 'sessionkey',
  pageSize: 20,
  isUseServerMenu: false,
  menu: [
    {
      Name: '首页',
      Icon: 'icon-fenlei',
      Url: '/'
    },
    {
      Name: '订单管理',
      Icon: 'icon-xihuan',
      Children: [
        {
          Name: '销售订单',
          Url: '/order/1'
        }
      ]
    },
    {
      Name: '用户管理',
      Icon: 'icon-gerenzhongxin',
      Children: [
        {
          Name: '角色管理',
          Url: '/list/1'
        }
      ]
    },
    {
      Name: '系统设置',
      Icon: 'icon-gengduo',
      Url: '/system'
    },
    {
      Name: '组件示例',
      Icon: 'icon-gengduo',
      Children: [
        {
          Name: 'CRUD组件',
          Url: '/components/crudTemplate'
        },
        {
          Name: '筛选组件',
          Url: '/components/filter'
        },
        {
          Name: '表格组件',
          Url: '/components/table'
        },
        {
          Name: '自定义面包屑',
          Url: '/components/customBreadcrumb'
        }
      ]
    }
  ]
};

export default config;

interface Config {
  appName: string;
  apiHosts: string;
  apiTimeout: number;
  apiSessionKey: string;
  pageSize: number;
  isUseServerMenu: boolean;
  menu: MenuItem[];
}

export interface MenuItem {
  key?: string;
  Name: string;
  Icon?: string;
  Url?: Pathname;
  Children?: MenuItem[];
}
