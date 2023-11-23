import ZerodhaLogo from '@assets/ZerodhaLogo';
import { memo } from 'react';
import Link from 'next/link';

const LoginWithZerodha = () => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_USER_API_URL}/auth/login/zerodha`} replace>
      <button type='button'>
        <ZerodhaLogo />
        Zerodha
      </button>
    </Link>
  );
};

export default memo(LoginWithZerodha);
