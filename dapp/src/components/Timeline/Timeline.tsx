import React from 'react';

interface TimelineItemProps {
  position: 'right' | 'left';
  title: string;
  children: React.ReactNode;
  className?: string;
  point?: string | undefined;
}

interface TimelineProps {
  children: React.ReactNode;
}

const TimelineItem = ({
  position,
  title,
  children,
  className = '',
  point = undefined,
}: TimelineItemProps) => {
  return (
    <div
      className={`mb-8 flex w-full items-center justify-between ${
        position == 'right'
          ? 'right-timeline'
          : 'left-timeline flex-row-reverse'
      }`}
    >
      <div className='order-1 w-5/12'></div>
      {point ? (
        <div className='nes-badge z-20 order-1 flex h-8 items-center p-2 px-3 '>
          <span className='is-dark static mx-auto font-primary text-sm font-semibold text-white'>
            {point}
          </span>
        </div>
      ) : null}
      <div
        className={`nes-container is-rounded order-1 m-0 w-5/12 px-6 py-4 shadow-xl ${className}`}
      >
        <h3 className='mb-3 font-secondary text-xl font-bold text-gray-800'>
          {title}
        </h3>
        <p className='font-secondary text-sm leading-snug tracking-wide text-gray-900 text-opacity-100'>
          {children}
        </p>
      </div>
    </div>
  );
};

const Timeline = ({ children }: TimelineProps) => {
  return (
    <div className='wrap relative h-full overflow-hidden p-10'>
      <div className='border-2-2 absolute left-[50%] h-full border border-solid border-gray-700 border-opacity-20'></div>
      {children}
    </div>
  );
};

Timeline.Item = TimelineItem;

export default Timeline;
