import React, { useState, useEffect } from 'react';
import { Select as AntdSelect } from 'antd';
import { fetchEnums } from 'api/_public';
import type { SelectProps } from 'antd/lib/select';

type Options = Array<{ label: string; value: string }>;

interface CustomSelectProps extends SelectProps<any, any> {
  enumUrl?: string;
  options?: Options;
}

export default function Select({
  enumUrl,
  options = [],
  ...componentProps
}: CustomSelectProps) {
  const [Enum, setEnum] = useState<Options>([]);
  useEffect(() => {
    (async () => {
      if (enumUrl && typeof enumUrl === 'string') {
        const data = await fetchEnums(enumUrl);
        setEnum(data.map((item) => ({ label: item.Value, value: item.Key })));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (options.length > 0) {
      setEnum(options);
    }
  }, [options]);

  return React.createElement(AntdSelect, {
    allowClear: true,
    optionFilterProp: 'label',
    filterOption: (input, option) =>
      option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    options: Enum,
    ...componentProps
  });
}
