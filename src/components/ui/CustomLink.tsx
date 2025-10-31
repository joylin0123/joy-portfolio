import { ReactNode } from 'react';

export default function CustomLink(props: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="hover:underline decoration-emerald-400/60 underline-offset-4"
      href={props.href}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
}
