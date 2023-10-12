import { Form, FormProps } from 'antd';
import { memo } from 'react';
import defaultValidateMessages from './defaultMessages';

const DigiForm = (props: FormProps) => (
  <Form
    validateMessages={
      props.validateMessages ? { ...defaultValidateMessages, ...props.validateMessages } : defaultValidateMessages
    }
    {...props}
  />
);

export default memo(DigiForm);
