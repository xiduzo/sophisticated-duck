import {
  DocumentCheckIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";
import { useState, type DetailedHTMLProps } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export function MarkdownWithFormatting({ text }: Props) {
  return (
    <Markdown
      className="post-markdown"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        pre: Pre,
        code({
          className,
          children,
          ...props
        }: DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
          const match = /language-(\w+)/.exec(className ?? "");

          if (!match) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }

          return (
            <SyntaxHighlighter
              // @ts-expect-error matching styles
              style={oneDark}
              PreTag="div"
              language={match[1]}
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {text}
    </Markdown>
  );
}

interface Props {
  text: string;
}

const Pre = ({ children }: React.PropsWithChildren) => (
  <pre>
    <CodeCopyBtn>{children}</CodeCopyBtn>
    {children}
  </pre>
);

export function CodeCopyBtn({ children }: React.PropsWithChildren) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (copied) return;
    // eslint-disable-next-line
    navigator.clipboard.writeText((children as any)?.props?.children);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  return (
    <div
      className="group absolute right-0 cursor-copy p-3 transition-all hover:scale-125"
      onClick={handleClick}
    >
      {copied ? (
        <DocumentCheckIcon className="h-4 w-4 fill-green-300" />
      ) : (
        <DocumentDuplicateIcon className="h-4 w-4 fill-gray-500 group-hover:fill-gray-400" />
      )}
    </div>
  );
}
