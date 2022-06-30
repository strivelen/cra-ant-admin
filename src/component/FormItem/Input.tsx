import React from 'react';
import { Input, InputProps } from 'antd';

interface FormInputProps {
  onChange?: (value: string) => void;
}

export default function FInput(props: InputProps & FormInputProps) {
  return React.createElement(Input, {
    allowClear: true,
    ...props,
    onChange: (e) => props.onChange && props.onChange(e.target.value)
  });
}
