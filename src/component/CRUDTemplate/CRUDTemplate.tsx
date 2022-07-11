import { useRef, useEffect } from 'react';
import Table, { RefTableType, TableConfig } from '../Table';
import Filter, { RefFilterType, FieldsConfig, FilterChildren } from '../Filter';

interface CURDTemplateProps {
  queryFieldsConfig: FieldsConfig[];
  tableConfig: TableConfig;
  actions?: FilterChildren;
}

export default function CRUDTemplate({
  queryFieldsConfig,
  tableConfig,
  actions
}: CURDTemplateProps) {
  const refFilter = useRef<RefFilterType>(null);
  const refTable = useRef<RefTableType>(null);
  useEffect(() => {
    const initFilterValue = refFilter.current?.initialValues || {};
    refTable.current?.onFilter(initFilterValue);
  }, []);
  return (
    <>
      <Filter
        ref={refFilter}
        fieldsConfig={queryFieldsConfig}
        onSubmit={(filterValue) => refTable.current?.onFilter(filterValue)}
      >
        {actions}
      </Filter>
      <Table {...tableConfig} ref={refTable} isDefaultInit={false} />
    </>
  );
}
