import JoinCampaign from '@/components/modules/JoinCampaign';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { displayMoney } from '@/utils/helpers';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { CheckCircle2Icon, CircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SectionProps {
  rewards: {
    target: number;
    reward: number;
  }[];
  gmv?: number;
  showProgress?: boolean;
}

interface RewardProps {
  tier: number;
  target: number;
  reward: number;
  gmv: number;
}

const iconData = [
  { offset: '0%', colorClass: 'text-purple drop-shadow-purple' },
  { offset: '33.33%', colorClass: 'text-blue drop-shadow-blue' },
  { offset: '66.66%', colorClass: 'text-teal drop-shadow-teal' },
  { offset: '100%', colorClass: 'text-green drop-shadow-green' }
];

const getRewardIcon = (tier: number) => {
  switch (tier) {
    case 1:
      return '/icons/reward-bronze.svg';
    case 2:
      return '/icons/reward-silver.svg';
    case 3:
      return '/icons/reward-gold.svg';
    case 4:
      return '/icons/reward-premium.svg';
    default:
      return '';
  }
};

const getTierColor = (tier: number) => {
  switch (tier) {
    case 1:
      return 'text-purple';
    case 2:
      return 'text-blue';
    case 3:
      return 'text-teal';
    case 4:
      return 'text-green';
    default:
      return '';
  }
};

const Reward = ({ tier, target, reward, gmv }: RewardProps) => (
  <div
    className={cn(
      'rounded-2xl relative border border-navy-600 opacity-100 w-40',
      target <= gmv && 'border-blue bg-blue/10'
    )}
  >
    <div className="w-full text-center">
      <Image
        src={getRewardIcon(tier)}
        width={48}
        height={48}
        className="w-12 h-12 mx-auto mt-2"
        alt="Reward"
      />
    </div>

    <h5 className={cn('text-xl text-center font-semibold', getTierColor(tier))}>
      {displayMoney(reward)}
    </h5>

    <h6 className="text-xs text-navy-300 text-center mb-2">Cash Rewards</h6>

    <div className="py-2 border-t border-navy-600">
      <h4 className="text-white text-center text-sm">
        {displayMoney(target)} GMV earned
      </h4>
    </div>
  </div>
);

export default async function Rewards({
  rewards,
  gmv = 0,
  showProgress = true
}: SectionProps) {
  const supabase = await createClient();
  const user = await getUser(supabase);

  const totalMilestones = rewards.length;
  const progress =
    (gmv / rewards[totalMilestones - 1].target) * (totalMilestones * 25);
  const nextMilestone = rewards.find((reward) => reward.target > gmv);
  const remaining = nextMilestone ? nextMilestone.target - gmv : 0;
  const milestonesReached = rewards.filter(
    (reward) => reward.target <= gmv
  ).length;

  return (
    <div className="flex flex-row lg:flex-col justify-around gap-5 h-[700px] lg:h-fit">
      {/* Reward Cards */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-stretch gap-5">
        {rewards.map((reward, index) => (
          <Reward
            key={index}
            tier={index + 1}
            target={reward.target}
            reward={reward.reward}
            gmv={gmv}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative lg:mb-6 flex flex-col lg:block items-center mx-0 my-auto lg:mx-auto lg:my-0 w-12 lg:w-[calc(100%-160px)] h-[calc(100%-155px)] lg:h-fit">
        {/* Mobile: Vertical progress bar */}
        <div className="lg:hidden w-3 h-full bg-navy-600 rounded-lg overflow-hidden lg:mb-6 relative">
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple via-blue to-green"
            style={{ height: `${progress}%` }}
          />
        </div>

        {/* Desktop: Horizontal progress bar */}
        <div className="hidden lg:block w-full h-3 bg-navy-600 rounded-lg overflow-hidden mb-2 relative">
          <div
            className="h-full bg-gradient-to-r from-purple via-blue to-green"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Desktop Icons (horizontal) */}
        <div className="hidden lg:block h-10">
          {iconData.map(({ offset, colorClass }, index) => {
            const Icon =
              index < milestonesReached ? CheckCircle2Icon : CircleIcon;
            const iconColor =
              index < milestonesReached ? colorClass : 'text-navy-600';

            return (
              <Icon
                key={index}
                size={40}
                className={`absolute -top-3.5 fill-navy-800 rounded-full ${iconColor}`}
                style={{ left: `calc(${offset} - 20px)` }}
              />
            );
          })}
        </div>

        {/* Mobile Icons (vertical) */}
        <div className="lg:hidden absolute left-1/2 -translate-x-1/2 -top-5 -bottom-5 w-10 flex flex-col justify-between">
          {iconData.map(({ colorClass }, index) => {
            const Icon =
              index < milestonesReached ? CheckCircle2Icon : CircleIcon;
            const iconColor =
              index < milestonesReached ? colorClass : 'text-navy-600';

            return (
              <Icon
                key={index}
                size={40}
                className={`fill-navy-800 ${iconColor}`}
              />
            );
          })}
        </div>

        {/* Tooltip Box */}
        {showProgress ? (
          <div
            className="hidden lg:block absolute w-60 h-[60px] lg:top-7 lg:left-[calc(var(--progress,50%)_-_120px)] bottom-[calc(var(--progress,50%)_-_30px)] lg:bottom-auto"
            style={{ '--progress': `${progress}%` } as React.CSSProperties}
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
                  {displayMoney(gmv)}
                </span>
              </p>
              <p>
                <span className="text-sm text-blue font-medium">
                  {displayMoney(remaining)}
                </span>{' '}
                away from the next reward
              </p>
            </div>
          </div>
        ) : (
          <div
            className="hidden lg:block absolute w-44 h-[44px] lg:top-7 lg:left-[calc(var(--progress,50%)_-_88px)] bottom-[calc(var(--progress,50%)_-_30px)] lg:bottom-auto"
            style={{ '--progress': `${progress}%` } as React.CSSProperties}
          >
            <Image
              src="/icons/text-box.svg"
              width={212}
              height={48}
              className="w-full h-full object-contain"
              alt="Box"
            />
            <div className="absolute top-0 left-0 w-full px-2 pt-3.5 pb-1.5 text-center text-xs text-navy-200">
              {user ? (
                <JoinCampaign style="link" />
              ) : (
                <Button
                  variant="link"
                  size="sm"
                  className="px-0 py-0 text-blue underline mr-1"
                  asChild
                >
                  <Link href="/auth/register">Join Now</Link>
                </Button>
              )}
              <span>to start earning</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
