import FivePaisaLogo from '@assets/5PaisaLogo';
import { memo } from 'react';

const LoginWithFivePaisa = () => {
  return (
    <button disabled type='button'>
      <FivePaisaLogo />
      5paisa
    </button>
  );
};

export default memo(LoginWithFivePaisa);
