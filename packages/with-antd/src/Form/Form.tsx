import { Form, FormProps } from 'antd';
import { ReactNode, memo } from 'react';
import defaultValidateMessages from './defaultMessages';

const DigiForm = (props: FormProps & { children: ReactNode }) => (
  <Form
    validateMessages={
      props.validateMessages ? { ...defaultValidateMessages, ...props.validateMessages } : defaultValidateMessages
    }
    {...props}
  />
);

export default memo(DigiForm);
