import ZerodhaLogo from '@assets/ZerodhaLogo';
import { memo } from 'react';

const LoginWithZerodha = () => {
  return (
    <button disabled type='button'>
      <ZerodhaLogo />
      Zerodha
    </button>
  );
};

export default memo(LoginWithZerodha);
