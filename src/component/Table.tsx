import {
  forwardRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  CSSProperties
} from 'react';
import { Table as AntTable, Row, Col } from 'antd';
import useTable, { UseTableParams, OnFilter, OnRefresh } from 'hooks/useTable';
import { ColumnType } from 'antd/lib/table';

export interface TableConfig extends UseTableParams {
  columns: ColumnType<any>[];
  rowKey?: string;
}

export interface RefTableType {
  onFilter: OnFilter;
  onRefresh: OnRefresh;
}

function Table(
  {
    columns,
    rowKey = 'ID',
    api,
    isDefaultInit,
    isPagination,
    pagerLocation,
    sortName,
    isInvertedOrder
  }: TableConfig,
  ref: Ref<RefTableType>
) {
  const { loading, dataSource, onChange, pagination, onFilter, onRefresh } =
    useTable({
      api,
      isDefaultInit,
      isPagination,
      pagerLocation,
      sortName,
      isInvertedOrder
    });
  useImperativeHandle(ref, () => ({
    onFilter,
    onRefresh
  }));
  return (
    <>
      <DataTotalNum
        totalNum={pagination?.total || dataSource.length || 0}
        style={{
          marginBottom: (pagerLocation || []).indexOf('topRight') > -1 ? -64 : 0
        }}
      />
      <AntTable
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination || false}
        onChange={onChange}
        rowKey={(record) => record[rowKey]}
      />
    </>
  );
}

interface DataTotalNumProps {
  totalNum: number | string;
  children?: ReactNode;
  style?: CSSProperties;
}

function DataTotalNum({ totalNum, children, style }: DataTotalNumProps) {
  return (
    <Row
      gutter={20}
      justify="start"
      align="middle"
      style={{ height: 64, ...style }}
    >
      <Col>
        <p
          style={{
            fontSize: 15,
            marginBottom: 3,
            fontWeight: 'bold'
          }}
        >
          总共找到
          <span style={{ fontSize: 20, color: 'red' }}> {totalNum} </span>
          条数据
        </p>
      </Col>
      <Col flex={1}>{children}</Col>
    </Row>
  );
}

export default forwardRef(Table);
