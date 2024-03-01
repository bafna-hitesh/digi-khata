import { memo } from 'react';
import { Input, Form, FormItemProps } from 'antd';

const EmailInput = ({ rules = [], ...props }: FormItemProps) => {
  return (
    <Form.Item rules={[{ type: 'email' }, ...rules]} {...props}>
      <Input placeholder='Enter your email address' allowClear />
    </Form.Item>
  );
};

export default memo(EmailInput);
