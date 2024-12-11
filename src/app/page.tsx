'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';


const Home = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/dashboard');
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <ClipLoader />
    </div>
  );
};

export default Home;