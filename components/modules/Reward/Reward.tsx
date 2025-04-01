import { cn } from '@/utils/cn';
import { CheckCircle2Icon, CircleIcon } from 'lucide-react';
import Image from 'next/image';

interface SectionProps {
  rewards: {
    target: number;
    reward: number;
  }[];
  gmv: number;
}

interface RewardProps {
  tier: number;
  target: number;
  reward: number;
}

export default function Rewards({ rewards, gmv }: SectionProps) {
  const progress =
    (gmv / rewards[rewards.length - 1].target) * (rewards.length * 25);
  const nextMilestone = rewards.find((reward) => reward.target > gmv);
  const remaining = nextMilestone ? nextMilestone.target - gmv : 0;
  const milestonesReached = rewards.filter(
    (reward) => reward.target <= gmv
  ).length;

  const iconData = [
    { offset: '0%', colorClass: 'text-purple' },
    { offset: `${(1 / 3) * 100}%`, colorClass: 'text-blue' },
    { offset: `${(2 / 3) * 100}%`, colorClass: 'text-teal' },
    { offset: '100%', colorClass: 'text-green' }
  ];

  const Reward = ({ tier, target, reward }: RewardProps) => {
    return (
      <>
        <div
          className={cn(
            'bg-navy-700 rounded-2xl relative border border-navy-600 opacity-40 w-48',
            gmv > target && 'opacity-100'
          )}
        >
          <div className="w-full text-center">
            <Image
              src={
                tier === 1
                  ? '/icons/reward-bronze.svg'
                  : tier === 2
                    ? '/icons/reward-silver.svg'
                    : tier === 3
                      ? '/icons/reward-gold.svg'
                      : tier === 4
                        ? '/icons/reward-premium.svg'
                        : ''
              }
              width={48}
              height={48}
              className="w-12 h-12 mx-auto my-2"
              alt="Reward"
            />
          </div>

          <h5
            className={cn(
              'text-xl text-center font-semibold',
              tier === 1
                ? 'text-purple'
                : tier === 2
                  ? 'text-blue'
                  : tier === 3
                    ? 'text-teal'
                    : tier === 4
                      ? 'text-green'
                      : ''
            )}
          >
            ${reward.toLocaleString()}
          </h5>

          <h6 className="text-xs text-navy-300 text-center mb-2">
            Cash Rewards
          </h6>

          <div className="p-2 border-t border-navy-600">
            <h4 className="text-white text-center">
              ${target.toLocaleString()} GMV earned
            </h4>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-row justify-between gap-4 mb-5">
        {rewards.map((reward, index) => (
          <Reward
            key={index}
            tier={index + 1}
            target={reward.target}
            reward={reward.reward}
          />
        ))}
      </div>

      <div
        className="relative mx-auto mb-16"
        style={{ width: 'calc(100% - 192px)' }}
      >
        <div className="w-full bg-navy-600 rounded-lg h-3 overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-purple via-blue to-green h-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {iconData.map(({ offset, colorClass }, index) => {
          const Icon =
            index < milestonesReached ? CheckCircle2Icon : CircleIcon;
          const iconColorClass =
            index < milestonesReached ? colorClass : 'text-navy-600';

          return (
            <Icon
              key={index}
              size={40}
              className={`absolute -top-3.5 fill-navy-800 ${iconColorClass}`}
              style={{ left: `calc(${offset} - 20px)` }}
            />
          );
        })}

        <div
          className="absolute top-7 w-60 h-[60px]"
          style={{ left: `calc(${progress}% - 120px)` }}
        >
          <Image
            src="/icons/text-box.svg"
            width={212}
            height={48}
            className="w-full h-full object-contain"
            alt="Box"
          />

          <div className="absolute top-0 left-0 w-full px-2 pt-3.5 pb-1.5 text-center text-xs text-navy-200">
            <p>
              You have earned{' '}
              <span className="text-sm text-blue font-medium">
                $
                {gmv.toLocaleString('en-US', {
                  maximumFractionDigits: 0
                })}
              </span>
            </p>

            <p>
              <span className="text-sm text-blue font-medium">
                $
                {remaining.toLocaleString('en-US', {
                  maximumFractionDigits: 0
                })}
              </span>{' '}
              away from the next reward
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
