import { Input } from 'antd';
import { PasswordProps } from 'antd/lib/input';
import React from 'react';

export default function Password(props: PasswordProps) {
  return React.createElement(Input.Password, {
    allowClear: true,
    ...props
  });
}
