import React from 'react';
import { Input as AntInput, InputProps } from 'antd';

interface CustomeInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
}

export default function Input(props: CustomeInputProps) {
  return React.createElement(AntInput, {
    allowClear: true,
    ...props,
    onChange: (e) => props.onChange && props.onChange(e.target.value)
  });
}
