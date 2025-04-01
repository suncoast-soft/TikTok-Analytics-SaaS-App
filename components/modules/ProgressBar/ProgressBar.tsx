export default function ProgressBar({
  progress,
  label,
  labelPosition = 'fixed'
}: {
  progress: number;
  label?: string;
  labelPosition?: 'fixed' | 'percentage';
}) {
  return (
    <div className="relative w-full">
      <div className="w-full bg-navy-600 rounded-lg h-3 overflow-hidden mb-2">
        <div
          className="bg-gradient-to-r from-purple to-blue h-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {label &&
        (labelPosition === 'percentage' ? (
          <div
            className="absolute px-2 py-1 text-xs font-bold bg-white text-navy-900 rounded-xl"
            style={{ left: `${progress}%` }}
          >
            {label}
          </div>
        ) : (
          <div className="text-white text-xs font-bold">{label}</div>
        ))}
    </div>
  );
}
