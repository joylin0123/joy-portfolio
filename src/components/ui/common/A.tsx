import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';
import { ReactNode } from 'react';

export const typesOfA = {
  UNDERLINE: 'underline',
  BUTTON: 'button',
};

const generateClassName = (type: string) => {
  switch (type) {
    case typesOfA.UNDERLINE:
      return 'hover:underline hover:decoration-ring underline-offset-2';
    case typesOfA.BUTTON:
      return `px-2 py-1 text-sm ${pixelBorderInlineStyle} hover:bg-button-background-hover`;
  }
};
export default function A(props: {
  href: string;
  children: ReactNode;
  className?: string;
  type: string;
  target?: string;
  rel?: string;
}) {
  const classNameByType = generateClassName(props.type);
  console.log(classNameByType);
  return (
    <a
      className={`${classNameByType} ${props.className}`}
      href={props.href}
      target={props.target}
      rel={props.rel}
    >
      {props.children}
    </a>
  );
}
