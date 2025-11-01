import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Components } from 'react-markdown';
import { Language } from 'prism-react-renderer';
import { Highlight } from 'prism-react-renderer';
import { themes } from 'prism-react-renderer';
import { Key } from 'react';
import A, { typesOfA } from './A';
import PixelDivider from './PixelDivider';

export default function Markdown({
  content,
  customClassName,
}: {
  content: string;
  customClassName?: Record<string, string>;
}) {
  const getClassName = (key: string, defaultClassName: string) => {
    const customClass = customClassName?.[key] || '';
    return `${defaultClassName} ${customClass}`.trim();
  };

  const getComponentsObject = (): Components => {
    return {
      table: ({ children }) => (
        <div className="my-4 -mx-4 overflow-x-auto md:mx-0 rounded-lg border border-ring bg-background">
          <table
            className={getClassName(
              'table',
              'w-full min-w-[720px] table-fixed md:table-auto text-sm',
            )}
          >
            {children}
          </table>
        </div>
      ),
      thead: ({ children }) => (
        <thead className={getClassName('thead', 'bg-muted/40')}>
          {children}
        </thead>
      ),
      tbody: ({ children }) => (
        <tbody className={getClassName('tbody', '')}>{children}</tbody>
      ),
      tr: ({ children }) => (
        <tr className={getClassName('tr', 'even:bg-muted/30')}>{children}</tr>
      ),
      th: ({ children }) => (
        <th
          className={getClassName(
            'th',
            'px-2 py-2 md:px-6 md:py-3 text-left text-xs font-semibold align-top whitespace-normal wrap-break-words hyphens-auto last:pr-8 border-b border-b-ring',
          )}
        >
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td
          className={getClassName(
            'td',
            'px-2 py-2 md:px-6 md:py-3 align-top whitespace-normal wrap-break-words hyphens-auto text-sm last:pr-8',
          )}
        >
          {children}
        </td>
      ),
      p: ({ children }) => (
        <p
          className={getClassName(
            'p',
            [
              'text-md leading-relaxed break-words mb-1',
              'md:[&:has(.mdf+.mdf)]:grid',
              'md:[&:has(.mdf+.mdf)]:grid-cols-2',
              '[&:has(.mdf+.mdf)]:gap-3 md:[&:has(.mdf+.mdf)]:gap-4',
              '[&>.mdf]:my-3',
            ].join(' '),
          )}
        >
          {children}
        </p>
      ),
      h1: ({ children }) => (
        <h1 className={getClassName('h1', 'text-5xl my-4 font-bold')}>
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className={getClassName('h2', 'text-4xl my-4 font-bold')}>
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className={getClassName('h3', 'text-3xl my-4 font-semibold')}>
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className={getClassName('h4', 'text-2xl my-4 font-semibold')}>
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5 className={getClassName('h5', 'text-lg my-4 font-semibold')}>
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6 className={getClassName('h6', 'text-md my-4 font-semibold')}>
          {children}
        </h6>
      ),
      hr: ({ children }) => <PixelDivider />,
      ul: ({ children }) => (
        <ul className={getClassName('ul', 'ml-8 list-disc')}>{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className={getClassName('ol', ['list-decimal ml-6'].join(' '))}>
          {children}
        </ol>
      ),

      li: ({ children }) => (
        <li
          className={getClassName(
            'li',
            ['space-y-3', '[&>p:first-child]:font-semibold'].join(' '),
          )}
        >
          {children}
        </li>
      ),
      img: ({ src = '', alt = '' }) => (
        <span
          className={getClassName(
            'figure-inline',
            'mdf inline-grid grid-rows-[auto_auto] justify-items-center gap-2 mx-auto w-full',
          )}
        >
          <img
            src={src}
            alt={alt}
            className={getClassName(
              'img',
              'block max-w-[420px] w-full rounded-lg border border-white/10 shadow',
            )}
            loading="lazy"
          />
          {alt ? (
            <em className="md-caption block w-full text-center italic">
              {alt}
            </em>
          ) : null}
        </span>
      ),
      figure: ({ children }) => (
        <figure
          className={getClassName('figure', 'mx-auto my-6 w-fit max-w-full')}
        >
          {children}
        </figure>
      ),
      figcaption: ({ children }) => (
        <figcaption
          className={getClassName(
            'figcaption',
            'mt-2 w-full text-center italic text-white/70',
          )}
        >
          {children}
        </figcaption>
      ),
      a: ({ children, href }) => (
        <A
          href={href || ''}
          type={typesOfA.UNDERLINE}
          className="text-ring"
          target="_blank"
        >
          {children}
        </A>
      ),
      code: ({ className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const code = String(children).replace(/\n$/, '');
        if (!match) {
          return (
            <code
              className="wrap-break-words bg-button-background px-1 rounded-sm"
              {...props}
            >
              {children}
            </code>
          );
        }
        const lang = match[1] as Language;
        return (
          <Highlight code={code} language={lang} theme={themes.nightOwl}>
            {({
              className: cn,
              style,
              tokens,
              getLineProps,
              getTokenProps,
            }: {
              className: string;
              style: React.CSSProperties;
              tokens: any[];
              getLineProps: (props: any) => any;
              getTokenProps: (props: any) => any;
            }) => (
              <pre
                className={`overflow-x-auto border border-ring p-4 my-4 rounded-lg ${cn}`}
                style={style}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token: any, key: Key | null | undefined) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        );
      },
      strong: ({ children }) => (
        <strong className={getClassName('strong', '')}>{children}</strong>
      ),
      blockquote: ({ children }) => (
        <blockquote
          className={getClassName(
            'blockquote',
            'relative my-6 rounded-lg border' +
              'shadow-[0_0_0_1px_rgba(0,0,0,0.02)] ' +
              '[&>p]:m-0 [&>p+*]:mt-3',
          )}
        >
          <span
            aria-hidden
            className={getClassName(
              'blockquoteIcon',
              'pointer-events-none absolute -top-3 -left-3 grid h-6 w-6 place-items-center ' +
                'rounded-md bg-button-background/40 text-ring',
            )}
          >
            “
          </span>
          <div className={getClassName('blockquoteBody', '')}>{children}</div>
        </blockquote>
      ),
      q: ({ children }) => (
        <q
          className={getClassName(
            'q',
            'italic text-gray-800 dark:text-gray-100',
          )}
        >
          {children}
        </q>
      ),
    };
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={getComponentsObject()}
    >
      {content}
    </ReactMarkdown>
  );
}
