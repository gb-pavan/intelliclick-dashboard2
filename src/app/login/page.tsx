import React from 'react';
import loginLogo from '@public/images/loginLogo.png';
import logo from '@public/images/logo.svg';
import googleIcon from '@public/images/googleIcon.svg';
import Image from 'next/image';

const LoginPage = () => {


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex justify-center w-3/4 max-h-screen">
        <Image src={loginLogo} alt="Login Logo" className="w-full h-auto max-h-screen object-cover" />
      </div>

      <div className="flex flex-col justify-center items-center text-center w-1/4 min-w-[250px] p-5 gap-8 box-border">
        <Image src={logo} alt="Logo" className="w-1/2 h-auto mb-4" />

        <div className="flex flex-col w-full gap-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#AB1CAF] focus:border-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#AB1CAF] focus:border-transparent"
          />
        </div>

        <button className="flex items-center justify-center px-8 py-2 rounded border border-[#AB1CAF] bg-[#FEF4FF] text-base min-w-[200px] gap-2">
          <Image src={googleIcon} alt="Google Icon" width={25} height={25} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;


