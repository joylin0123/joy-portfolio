import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Components } from 'react-markdown';

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
        <table className={getClassName('table', 'divide-y divide-gray-200 border border-gray-200')}>
          {children}
        </table>
      ),
      thead: ({ children }) => (
        <thead className={getClassName('thead', '')}>{children}</thead>
      ),
      tbody: ({ children }) => (
        <tbody className={getClassName('tbody', 'divide-y divide-gray-200')}>
          {children}
        </tbody>
      ),
      tr: ({ children }) => <tr className={getClassName('tr', '')}>{children}</tr>,
      th: ({ children }) => (
        <th
          className={getClassName(
            'th',
            'px-6 py-3 text-left text-xs font-medium uppercase',
          )}
        >
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className={getClassName('td', 'text-md px-6 py-4')}>{children}</td>
      ),
      p: ({ children }) => (
        <p
          className={getClassName(
            'p',
            [
              'text-md leading-relaxed break-words',
              'md:[&:has(.mdf+.mdf)]:grid',
              'md:[&:has(.mdf+.mdf)]:grid-cols-2',
              '[&:has(.mdf+.mdf)]:gap-3 md:[&:has(.mdf+.mdf)]:gap-4',
              '[&>.mdf]:my-3',
            ].join(' ')
          )}
        >
          {children}
        </p>
      ),
      h1: ({ children }) => (
        <h1 className={getClassName('h1', 'text-5xl mb-4 font-bold')}>{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className={getClassName('h2', 'text-4xl mb-4 font-bold')}>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className={getClassName('h3', 'text-3xl mb-4 font-semibold')}>{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className={getClassName('h4', 'text-2xl mb-4 font-semibold')}>{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 className={getClassName('h5', 'text-lg mb-4 font-semibold')}>{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className={getClassName('h6', 'text-md mb-4 font-semibold')}>{children}</h6>
      ),
      hr: ({ children }) => <hr className={getClassName('hr', 'my-4')}>{children}</hr>,
      ul: ({ children }) => <ul className={getClassName('ul', 'ml-8 list-disc')}>{children}</ul>,
      ol: ({ children }) => (
        <ol
          className={getClassName(
            'ol',
            [
              'grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12',
              'list-decimal ml-6',
            ].join(' ')
          )}
        >
          {children}
        </ol>
      ),

      li: ({ children }) => (
        <li
          className={getClassName(
            'li',
            [
              'space-y-3',
              '[&>p:first-child]:font-semibold',
            ].join(' ')
          )}
        >
          {children}
        </li>
      ),
      img: ({ src = '', alt = '' }) => (
        <span className={getClassName(
          'figure-inline',
          'mdf inline-grid grid-rows-[auto_auto] justify-items-center gap-2 mx-auto w-full'
        )}>
          <img
            src={src}
            alt={alt}
            className={getClassName(
              'img',
              'block max-w-[420px] w-full rounded-lg border border-white/10 shadow'
            )}
            loading="lazy"
          />
          {alt ? (
            <em className="md-caption block w-full text-center italic text-white/70">
              {alt}
            </em>
          ) : null}
        </span>
      ),
      figure: ({ children }) => (
        <figure className={getClassName('figure', 'mx-auto my-6 w-fit max-w-full')}>
          {children}
        </figure>
      ),
      figcaption: ({ children }) => (
        <figcaption className={getClassName('figcaption', 'mt-2 w-full text-center italic text-white/70')}>
          {children}
        </figcaption>
      ),
      a: ({ children, href }) => (
        <a href={href} target="_blank" rel="noreferrer" className={getClassName('a', 'text-emerald-400 hover:underline')}>
          {children}
        </a>
        ),
      code: ({ className, children }) => {
        const isBlock = className?.includes('language-');
        return isBlock ? (
          <pre className="overflow-x-auto">
            <code className="whitespace-pre-wrap break-words">{children}</code>
          </pre>
        ) : (
          <code className="break-words break-all">{children}</code>
        );
      },
      strong: ({ children }) => <strong className={getClassName('strong', '')}>{children}</strong>,
      blockquote: ({ children }) => (
        <blockquote
          className={getClassName(
            'blockquote',
            'relative my-6 rounded-lg border border-gray-200/40 bg-gray-50/50 p-4 ' +
              'text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 ' +
              'shadow-[0_0_0_1px_rgba(0,0,0,0.02)] ' +
              '[&>p]:m-0 [&>p+*]:mt-3'
          )}
        >
          <span
            aria-hidden
            className={getClassName(
              'blockquoteIcon',
              'pointer-events-none absolute -top-3 -left-3 grid h-6 w-6 place-items-center ' +
                'rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
            )}
          >
            “
          </span>
          <div className={getClassName('blockquoteBody', '')}>{children}</div>
        </blockquote>
      ),
      q: ({ children }) => (
        <q className={getClassName('q', 'italic text-gray-800 dark:text-gray-100')}>
          {children}
        </q>
        ),
    };
      
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={getComponentsObject()}>
      {content}
    </ReactMarkdown>
  );
}
