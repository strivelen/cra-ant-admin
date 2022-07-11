import { Row, Col, Form, Button } from 'antd';
import * as formItems from 'component/FormItem';
import React, {
  ReactNode,
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  Ref
} from 'react';
import type { FormInstance } from 'antd/es/form/Form';

type FormItemsKeys = keyof typeof formItems;

type ComPropsType = {
  [key in FormItemsKeys]: ComponentProps<typeof formItems[key]>;
};

export interface FieldsConfig {
  label: string;
  component: FormItemsKeys;
  fields: string;
  componentProps?: ComPropsType[FormItemsKeys];
  defaultValue?: any;
}

export type FilterChildren = ((form: FormInstance) => ReactNode) | ReactNode;

interface FilterProps {
  fieldsConfig: FieldsConfig[];
  children?: FilterChildren;
  onSubmit(fieldsValue: FormData): void;
}

export interface RefFilterType {
  initialValues: object;
  form: FormInstance;
}

const ColSpan = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 6,
  xxl: 4
};

function Filter(
  { fieldsConfig = [], children, onSubmit }: FilterProps,
  ref: Ref<RefFilterType>
) {
  const [form] = Form.useForm();
  const initialValues = fieldsConfig.reduce(
    (obj, filterItem) => ({
      ...obj,
      [filterItem.fields]: filterItem.defaultValue
    }),
    {}
  );

  useImperativeHandle(
    ref,
    () => ({
      initialValues,
      form
    }),
    [initialValues, form]
  );

  return (
    <Form
      form={form}
      labelWrap
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={(fieldsValue) => onSubmit(fieldsValue)}
    >
      <FilterFieldsConfig fieldsConfig={fieldsConfig}>
        <FilterBtns isShowQueryBtn={fieldsConfig.length !== 0} form={form}>
          {typeof children === 'function' ? children(form) : children}
        </FilterBtns>
      </FilterFieldsConfig>
    </Form>
  );
}

function FilterFieldsConfig({
  fieldsConfig,
  children
}: {
  fieldsConfig: FieldsConfig[];
  children?: ReactNode;
}) {
  if (fieldsConfig.length === 0) {
    return null;
  }
  return (
    <Row gutter={20} wrap>
      {fieldsConfig.map((item) => {
        const { component, label, fields, componentProps = {} } = item;
        const Com = formItems[component] as any;
        return (
          <Col key={label} {...ColSpan}>
            <Form.Item name={fields} label={label} style={{ marginBottom: 10 }}>
              {React.createElement(Com, { ...componentProps })}
            </Form.Item>
          </Col>
        );
      })}
      <Col style={{ flex: 1 }}>{children}</Col>
    </Row>
  );
}

interface FilterBtnsProps {
  form: FormInstance;
  isShowQueryBtn: boolean;
  children?: ReactNode;
}

function FilterBtns({ form, isShowQueryBtn, children }: FilterBtnsProps) {
  const extendsBoxStyle: CSSProperties = {
    marginBottom: 10,
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'end'
  };
  if (!isShowQueryBtn) {
    return <div style={{ ...extendsBoxStyle }}>{children}</div>;
  }
  return (
    <Row gutter={20} wrap style={{ minWidth: 260 }}>
      <Col style={{ marginBottom: 10 }}>
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          查询
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          onClick={() => {
            form.resetFields();
            form.submit();
          }}
        >
          重置
        </Button>
      </Col>
      <Col flex={1} style={{ ...extendsBoxStyle }}>
        {children}
      </Col>
    </Row>
  );
}

export default forwardRef(Filter);
