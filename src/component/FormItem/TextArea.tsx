import { Input } from 'antd';
import type { TextAreaProps } from 'antd/lib/input';
import React from 'react';

interface CustomTextAreaProps extends Omit<TextAreaProps, 'onChange'> {
  onChange?(v: string): void;
}

export default function TextArea(props: CustomTextAreaProps) {
  return React.createElement(Input.TextArea, {
    allowClear: true,
    ...props,
    onChange: (e) => {
      props.onChange && props.onChange(e.target.value);
    }
  });
}
