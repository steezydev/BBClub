import { blackA, mauve, violet } from '@radix-ui/colors';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { css, keyframes, styled } from '@stitches/react';
import React from 'react';

import { shortenHex } from '@/lib/helper';

import Button from '@/components/buttons/Button';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContentCSS = css({
  zIndex: 101,
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  '&:focus': { outline: 'none' },
});

interface ContentProps {
  children: React.ReactNode;
}

function Content({ children, ...props }: ContentProps) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <DialogPrimitive.Content
        {...props}
        className={`${StyledContentCSS()} nes-container is-rounded`}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: mauve.mauve12,
  fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: '10px 0 20px',
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: violet.violet11,
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: violet.violet4 },
  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

interface WalletModalProps {
  address: string;
  disconnect: () => void;
  balance: number;
}

const WalletModal = ({ address, disconnect, balance }: WalletModalProps) => (
  <Dialog>
    <DialogTrigger>
      <div className='nes-badge is-splited nes-pointer z-20 order-1 flex w-fit items-center'>
        <span className='is-primary static w-fit px-4 font-secondary text-base font-semibold'>
          {shortenHex(address)}
        </span>
        <span className='is-dark static w-fit px-3 font-secondary text-base font-semibold'>
          {balance} BBC
        </span>
      </div>
    </DialogTrigger>
    <Content>
      <DialogTitle>Account</DialogTitle>
      <DialogDescription>
        <span className='flex flex-col gap-2'>
          <span className='nes-text is-primary w-full'>
            {shortenHex(address, 8)}
          </span>
          <span>
            <a
              href={`https://etherscan.io/address/${address}`}
              className='font-secondary text-sm'
              target='_blank'
              rel='noreferrer'
            >
              View on Etherscan
            </a>
          </span>
        </span>
      </DialogDescription>
      <div className='mt-8 flex justify-around'>
        <DialogClose asChild>
          <Button onClick={disconnect} variant='primary'>
            Disconnect
          </Button>
        </DialogClose>
      </div>
      <DialogClose asChild>
        <IconButton aria-label='Close'></IconButton>
      </DialogClose>
    </Content>
  </Dialog>
);

export default WalletModal;
