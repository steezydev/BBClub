import { mauve, violet } from '@radix-ui/colors';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { css, keyframes, styled } from '@stitches/react';
import Link from 'next/link';
import React from 'react';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledContentCSS = css({
  minWidth: 170,
  backgroundColor: 'white',
  borderRadius: 6,
  padding: 5,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'forwards',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const itemStyles = {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  borderRadius: 3,
  marginTop: 2,
  marginBottom: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 25,
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: violet.violet9,
    color: violet.violet1,
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });

// Exports
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuItem = StyledItem;

// Your app...
const Box = styled('div', {});

export const DropdownMenuDemo = () => {
  return (
    <Box>
      <DropdownMenu>
        <DropdownMenuTrigger className='nes-pointer'>Menu</DropdownMenuTrigger>

        <DropdownMenuPrimitive.Content
          className={`${StyledContentCSS()} nes-container is-rounded`}
          sideOffset={5}
        >
          <DropdownMenuItem>
            <Link href='/#about'>About</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/#roadmap'>Roadmap</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/mint'>Mint</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/stake'>Stake</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/wallet'>Wallet</Link>
          </DropdownMenuItem>
        </DropdownMenuPrimitive.Content>
      </DropdownMenu>
    </Box>
  );
};

export default DropdownMenuDemo;
