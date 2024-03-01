'use client';

import { Button, ButtonProps } from 'antd';

const DigiButton = (props: ButtonProps) => <Button {...props}>{props.children}</Button>;

export default DigiButton;
