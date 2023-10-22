import IIFLLogo from '@assets/IIFLLogo';
import { memo } from 'react';

const LoginWithIIFL = () => {
  return (
    <button disabled type='button'>
      <IIFLLogo />
      IIFL
    </button>
  );
};

export default memo(LoginWithIIFL);
