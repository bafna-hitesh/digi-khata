import { Input, FormItemProps, Form } from 'antd';
import EmailInput from '../EmailInput';

interface DigiInputProps extends FormItemProps {
  type?: string;
}

const DigiInput = ({ type = '', ...props }: DigiInputProps) => {
  if (type === 'email') {
    return <EmailInput {...props} />;
  }
  return (
    <Form.Item {...props}>
      <Input />
    </Form.Item>
  );
};

export default DigiInput;
