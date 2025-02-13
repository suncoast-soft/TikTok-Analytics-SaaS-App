interface SeparatorProps {
  text?: string;
}

export default function Separator({ text }: SeparatorProps) {
  return (
    <div className="relative">
      <div className="relative flex items-center py-1">
        <div className="grow border-t border-navy-200/60"></div>

        {text && (
          <span className="mx-3 shrink text-xs font-semibold leading-8 text-navy-200/80">
            {text}
          </span>
        )}

        <div className="grow border-t border-navy-200/60"></div>
      </div>
    </div>
  );
}
