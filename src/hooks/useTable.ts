import { useState, useEffect } from 'react';
import { message, TablePaginationConfig } from 'antd';
import { fetchList } from 'api/_public';
import config from 'app/config';
import { getApiTypesValue } from 'util/utils';

type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

export type OnFilter = (filterFields: object) => void;
export type OnRefresh = (isToPageOne: boolean) => void;

export interface UseTableParams {
  api: Api;
  initFilterValue?: object;
  isPagination?: boolean;
  pagerLocation?: TablePaginationPosition[];
  isInvertedOrder?: boolean;
  sortName?: string;
  isDefaultInit?: boolean;
}

/**
 * Table组件用hook
 * @param {string | function}    api        - 必需，列表接口，如："/User/List"
 * @param {object}    filterValue           - 非必需，初始化table数据时携带的默认筛选项
 * @param {boolean}   isDefaultInit         - 非必需，是否默认初始化列表，默认为：true
 * @param {boolean}   isPagination          - 非必需，是否分页，默认为：true
 * @param {TablePaginationPosition[]} pagerLocation - 非必须，分页器位置，默认使用antd分页器默认值、
 * @param {string}    sortName              - 非必需，排序字段，默认为：ID
 * @param {boolean}   isInvertedOrder       - 非必需，是否 -倒序- 排列，默认为：true
 * @returns
 */
function useTable({
  api,
  initFilterValue = {},
  isDefaultInit,
  isPagination = true,
  pagerLocation,
  sortName = 'ID',
  isInvertedOrder = true
}: UseTableParams) {
  const [_isDefaultInit, setIsDefaultInit] = useState<boolean>(
    isDefaultInit !== undefined ? isDefaultInit : true
  );
  const [loading, setLoading] = useState(_isDefaultInit);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [filterParams, setFilterParams] = useState(initFilterValue);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: config.pageSize,
    total: 0,
    position: pagerLocation
  });
  const [_isInvertedOrder, setIsInvertedOrder] = useState(isInvertedOrder);
  const [_sortName, setSortName] = useState(sortName);
  // 筛选
  const onFilter = function (filterFields: object) {
    setFilterParams({ ...filterFields });
    setPagination({
      ...pagination,
      current: 1
    });
  };
  // 页码改变
  const onChange = (
    currentPagination: TablePaginationConfig,
    filters: any,
    sorte: any
  ) => {
    console.log('sorte: ', sorte);
    setIsInvertedOrder(sorte.order !== 'ascend');
    setSortName(sorte.order === undefined ? sortName : sorte.field);
    setPagination({ ...currentPagination });
  };
  // 刷新列表
  const onRefresh = (isToPageOne: boolean) => {
    if (isToPageOne) {
      if (pagination.current === 1) {
        return getDataSource();
      }
      setPagination({
        ...pagination,
        current: 1
      });
    } else {
      getDataSource();
    }
  };
  // 获取列表
  const getDataSource = async () => {
    try {
      const paginationParams = {
        pageSize: isPagination ? pagination.pageSize : undefined,
        pageNumber: isPagination ? pagination.current : undefined,
        isASC: !_isInvertedOrder,
        name: _sortName
      };
      setLoading(true);
      if (!api) {
        return message.warning('缺少参数: api');
      }
      const { url, params } = getApiTypesValue(api);
      const data = await fetchList(url, {
        ...params,
        ...paginationParams,
        ...filterParams
      });
      setLoading(false);
      setDataSource(Array.isArray(data) ? data : data.List);
      isPagination &&
        !Array.isArray(data) &&
        setPagination({
          ...pagination,
          total: data.VirtualCount
        });
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (_isDefaultInit) {
      getDataSource();
    } else {
      setIsDefaultInit(true);
    }
  }, [
    pagination.current,
    pagination.pageSize,
    filterParams,
    _isInvertedOrder,
    _sortName
  ]);

  return {
    loading,
    dataSource,
    onRefresh,
    onFilter,
    onChange: isPagination ? onChange : undefined,
    pagination: isPagination ? pagination : undefined
  };
}

export default useTable;
