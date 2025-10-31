import { useState } from 'react';
import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';
import { copyToClickBoard } from '@/libs/helpers/copyToClickBoard';

export default function CopyButton({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => {
        copyToClickBoard(value);
        setOk(true);
        setTimeout(() => setOk(false), 1400);
      }}
      className={`relative px-2 py-1 text-xs ${pixelBorderInlineStyle} hover:bg-button-background-hover`}
    >
      {ok ? 'Copied!' : label}
    </button>
  );
}
