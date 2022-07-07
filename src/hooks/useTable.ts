import { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import { fetchList } from 'api/_public';
import {
  PaginationPosition,
  PaginationProps
} from 'antd/lib/pagination/Pagination';
import { Axios, AxiosRequestConfig } from 'axios';
// import { handleApiValueType } from 'component/SinglePage/helper';
const Config = require('config');

/**
 * ================================================
 *      数据接口多样化，初始化筛选参数如何获取（ref | redux | recalculate）
 * ================================================
 */

interface UseTableParams {
  api: string;
  filterValue?: object;
  isPagination?: boolean;
  pagerLocation?: PaginationPosition;
  isInvertedOrder: boolean;
  sortName: string;
}

function useTable({
  api,
  filterValue = {},
  isPagination,
  pagerLocation,
  isInvertedOrder,
  sortName = 'ID'
}: UseTableParams) {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [filterParams, setFilterParams] = useState(filterValue);
  const [pagination, setPagination] = useState<
    PaginationProps & { position?: PaginationPosition }
  >({
    current: 1,
    pageSize: Config.pageSize,
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
  // 页码改变时执行函数
  const onChange = useCallback(
    (currentPagination: PaginationProps, filters: any, sorte: any) => {
      setIsInvertedOrder(sorte.order === 'ascend');
      setSortName(sorte.order === undefined ? _sortName : sorte.field);
      setPagination({ ...currentPagination });
    },
    []
  );
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
    const paginationParams = {
      pageSize: isPagination ? pagination.pageSize : undefined,
      pageNumber: isPagination ? pagination.current : undefined,
      isASC: _isInvertedOrder,
      name: _sortName
    };
    setLoading(true);
    if (!api) {
      return message.warning('缺少参数: api');
    }
    const data = await fetchList(api, {
      ...paginationParams,
      ...filterParams
      // ...params
    });
    setLoading(false);
    console.log('执行table-api完成：', data);
    setDataSource(data.List);
    isPagination &&
      setPagination({
        ...pagination,
        total: data.VirtualCount
      });
  };

  useEffect(() => {
    getDataSource();
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
