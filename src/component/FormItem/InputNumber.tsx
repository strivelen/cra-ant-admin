import React from 'react';
import { InputNumber as AntInputNumber, InputNumberProps } from 'antd';

export default function InputNumber(props: InputNumberProps) {
  return React.createElement(AntInputNumber, {
    style: {
      width: 'auto'
    },
    controls: false,
    ...props
  });
}
