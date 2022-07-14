import { Row, Col, ColProps, Form, FormItemProps } from 'antd';
import * as formItems from 'component/FormItem';
const FormItem = Form.Item;

type FormItemsKeys = keyof typeof formItems;

type ComPropsType = {
  [key in FormItemsKeys]: ComponentProps<typeof formItems[key]>;
};

interface FieldsOption extends FormItemProps {
  component: FormItemsKeys;
  componentProps?: ComPropsType[FormItemsKeys];
  isFillLine?: boolean;
  col?: ColProps;
}

export type Fields = { [propName: string]: FieldsOption };

interface RenderFieldsProps {
  fields: Fields;
  defaultProps?: ComPropsType[FormItemsKeys];
}

const colSpan = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 6 },
    lg: { span: 6 },
    xl: { span: 6 },
    xxl: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 18 },
    lg: { span: 18 },
    xl: { span: 18 },
    xxl: { span: 18 }
  }
};

export default function Fields({
  fields,
  defaultProps = {}
}: RenderFieldsProps) {
  const fieldKeys = Object.keys(fields);
  return (
    <Row gutter={20}>
      {fieldKeys.map((item) => {
        const {
          component: comName,
          componentProps,
          col,
          isFillLine,
          ...formItemProps
        } = fields[item];
        const Com = formItems[comName] as any;
        if (formItemProps.hidden) {
          return (
            <FormItem key={item} name={item} {...formItemProps}>
              <Com {...defaultProps} {...componentProps} />
            </FormItem>
          );
        }
        if (isFillLine) {
          return (
            <Col key={item} span={24} {...col}>
              <FormItem
                name={item}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                {...formItemProps}
              >
                <Com {...defaultProps} {...componentProps} />
              </FormItem>
            </Col>
          );
        }
        return (
          <Col key={item} span={12} {...col}>
            <FormItem name={item} {...colSpan} {...formItemProps}>
              <Com {...defaultProps} {...componentProps} />
            </FormItem>
          </Col>
        );
      })}
    </Row>
  );
}
