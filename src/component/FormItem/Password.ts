import { Input } from 'antd';
import type { PasswordProps } from 'antd/lib/input';
import React from 'react';

interface CustomPasswordProps extends Omit<PasswordProps, 'onChange'> {
  onChange?(v: string): void;
}

export default function Password(props: CustomPasswordProps) {
  return React.createElement(Input.Password, {
    allowClear: true,
    ...props,
    onChange: (e) => {
      props.onChange && props.onChange(e.target.value);
    }
  });
}
