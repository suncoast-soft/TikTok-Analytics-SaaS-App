import { cn } from '@/utils/cn';
import { MedalIcon } from 'lucide-react';

interface ModuleProps {
  tier: number;
  target: number;
  reward: number;
  progress?: number;
}

export default function Reward({
  tier,
  target,
  reward,
  progress = 0
}: ModuleProps) {
  return (
    <div
      className={cn(
        'bg-navy-700 rounded-2xl relative',
        progress > target && 'border-2 border-green-600'
      )}
    >
      {progress > target && (
        <div className="absolute -top-3.5 -right-3.5 rounded-full p-1 bg-green-600 border-2 border-navy-900">
          <MedalIcon width={16} height={16} className="text-navy-800" />
        </div>
      )}

      <div className="overflow-hidden rounded-2xl">
        <div className="p-5">
          <h4 className="text-white text-2xl font-bold text-center">
            ${target.toLocaleString()} GMV
          </h4>
        </div>

        <div
          className={cn(
            'p-2 text-navy-900',
            tier === 1
              ? 'bg-navy-400/70'
              : tier === 2
                ? 'bg-yellow-700/70'
                : tier === 3
                  ? 'bg-slate-200/70'
                  : tier === 4
                    ? 'bg-amber-400/70'
                    : ''
          )}
        >
          <h5 className="font-semibold text-center">
            ${reward.toLocaleString()} Cash Rewards
          </h5>
        </div>
      </div>
    </div>
  );
}
