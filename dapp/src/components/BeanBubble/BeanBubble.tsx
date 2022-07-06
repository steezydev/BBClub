import React from 'react';

import clsxm from '@/lib/clsxm';

interface BeanBubbleProps {
  type?: 'ltr' | 'rtl';
  children: React.ReactNode;
}

export default function BeanBubble({
  children,
  type = 'ltr',
}: BeanBubbleProps) {
  return (
    <div
      className={clsxm(
        ' relative flex w-full justify-center',
        type == 'ltr' ? 'bean1' : 'bean2'
      )}
    >
      <div
        className={clsxm(
          'nes-balloon font-text h-fit max-w-2xl',
          type == 'ltr' ? 'from-left' : 'from-right'
        )}
      >
        {children}
      </div>
    </div>
  );
}
