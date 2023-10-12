import { Form, FormItemProps } from 'antd';
import { memo } from 'react';

const FormItem = (props: FormItemProps) => <Form.Item {...props} />;

export default memo(FormItem);
