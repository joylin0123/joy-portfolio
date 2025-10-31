import { ReactNode } from 'react';

export default function A(props: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`bg-button-background hover:bg-button-background-hover rounded-lg text-xs px-2 py-1 ${props.className}`}
      href={props.href}
    >
      {props.children}
    </a>
  );
}
