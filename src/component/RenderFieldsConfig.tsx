import { Row, Col, ColProps, Form, FormItemProps } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
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

export type FieldsType = { [propName: string]: FieldsOption };

interface RenderFieldsProps {
  fields: FieldsType;
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
        const publicFormItemProps = generateSpecialFormItemProps(comName);

        const Com = formItems[comName] as any;
        if (formItemProps.hidden) {
          return (
            <FormItem
              key={item}
              name={item}
              {...publicFormItemProps}
              {...formItemProps}
            >
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
                {...publicFormItemProps}
                {...formItemProps}
              >
                <Com {...defaultProps} {...componentProps} />
              </FormItem>
            </Col>
          );
        }
        return (
          <Col key={item} span={12} {...col}>
            <FormItem
              name={item}
              {...colSpan}
              {...publicFormItemProps}
              {...formItemProps}
            >
              <Com {...defaultProps} {...componentProps} />
            </FormItem>
          </Col>
        );
      })}
    </Row>
  );
}

function generateSpecialFormItemProps(componentString: FormItemsKeys) {
  let props = {};
  if (componentString === 'Upload') {
    props = {
      valuePropName: 'fileList',
      getValueFromEvent: (e: UploadChangeParam) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      }
    };
  }
  if (componentString === 'SingleImgUpload') {
    props = {
      valuePropName: 'imageUrl'
    };
  }
  return props;
}
