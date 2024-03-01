import ICICIDirect from '@assets/ICICIDirectLogo';
import { memo } from 'react';

const LoginWithIcici = () => {
  return (
    <button disabled type='button'>
      <ICICIDirect />
      ICICI Direct
    </button>
  );
};

export default memo(LoginWithIcici);
