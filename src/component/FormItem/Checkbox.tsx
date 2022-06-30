import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import type { CheckboxGroupProps, CheckboxProps } from 'antd/lib/checkbox';

export default function Checkbox(props: CheckboxProps) {
  return React.createElement(AntCheckbox, { ...props });
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  return React.createElement(AntCheckbox.Group, { ...props });
}
