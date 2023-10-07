import { memo } from 'react';
import { Input, Button } from '@digi/components';

const Waitlist = () => {
  return (
    <div>
      <Input />
      <Button>Waitlist</Button>
    </div>
  );
};

export default memo(Waitlist);
