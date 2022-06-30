import React from 'react';
import { Radio as AntRadio } from 'antd';
import type { RadioGroupProps, RadioProps } from 'antd/lib/radio';

export default function Radio(props: RadioProps) {
  return React.createElement(AntRadio, props);
}

interface CustomRadioGroupProps extends Omit<RadioGroupProps, 'onChange'> {
  onChange(v: string | number | boolean): void;
}

export function RadioGroup(props: CustomRadioGroupProps) {
  return React.createElement(AntRadio.Group, {
    ...props,
    onChange: (e) => {
      props.onChange && props.onChange(e.target.value);
    }
  });
}
