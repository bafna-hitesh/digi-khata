import AngelOne from '@assets/AngelOneLogo';
import { memo } from 'react';

const LoginWithAngelOne = () => {
  return (
    <button disabled type='button'>
      <AngelOne />
      Angel One
    </button>
  );
};

export default memo(LoginWithAngelOne);
