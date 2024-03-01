import Upstock from '@assets/UpstockLogo';
import { memo } from 'react';

const LoginWithUpstocx = () => {
  return (
    <button disabled type='button'>
      <Upstock />
      Upstox
    </button>
  );
};

export default memo(LoginWithUpstocx);
