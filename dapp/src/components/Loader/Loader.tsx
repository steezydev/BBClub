import React from 'react';

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <div className='w-full text-center'>
      <span>{message}</span>
    </div>
  );
}
