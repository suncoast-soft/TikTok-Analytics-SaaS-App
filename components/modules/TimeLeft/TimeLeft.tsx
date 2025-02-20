import { ClockIcon, TimerIcon } from 'lucide-react';
import DarkShadow from '../DarkShadow';
import { format } from 'date-fns';

const getTimeComponents = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  return { days, hours, minutes };
};

export function TimeLeftBox({
  start_date,
  end_date
}: {
  start_date: string;
  end_date: string;
}) {
  const startDate = new Date(start_date);

  const endDate = new Date(end_date);
  const now = new Date();

  const timeLeft =
    startDate > now
      ? Math.max(0, startDate.getTime() - now.getTime())
      : Math.max(0, endDate.getTime() - now.getTime());

  const { days, hours } = getTimeComponents(timeLeft);

  const text =
    now > endDate
      ? 'Ended'
      : startDate > now
        ? `Starts In ${days}d ${hours}h`
        : `Ends In ${days}d ${hours}h`;

  return (
    <DarkShadow className="rounded-lg">
      <div className="flex items-center gap-1.5 px-3">
        <TimerIcon className="text-amber-400" width={16} />
        <p className="text-white text-xs font-semibold">{text}</p>
      </div>
    </DarkShadow>
  );
}

export function TimeLeftBar({
  start_date,
  end_date
}: {
  start_date: string;
  end_date: string;
}) {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const now = new Date();

  const totalDuration = endDate.getTime() - startDate.getTime();
  const timeLeft =
    startDate > now
      ? Math.max(0, startDate.getTime() - now.getTime())
      : Math.max(0, endDate.getTime() - now.getTime());

  const { days, hours, minutes } = getTimeComponents(timeLeft);
  const progress =
    startDate > now
      ? 0
      : (Math.max(0, totalDuration - timeLeft) / totalDuration) * 100;

  const text =
    now > endDate
      ? 'Campaign ended at'
      : startDate > now
        ? `Campaign starts in`
        : `Campaign ends in`;

  if (now > endDate) {
    return (
      <div className="w-full">
        <div className="flex flex-row items-center gap-2 mb-3">
          <ClockIcon width={16} height={16} className="text-amber-400" />
          <p className="text-white text-xs font-semibold">
            Campaign ended on {format(endDate, 'PPP')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-row items-center gap-2 mb-3">
        <ClockIcon width={16} height={16} className="text-amber-400" />
        <p className="text-white text-xs font-semibold">{text}</p>
      </div>

      <div className="w-full bg-navy-800 rounded-lg h-2 overflow-hidden mb-2">
        <div
          className="bg-amber-400 h-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-white text-xs font-bold">
        {days}d {hours}h {minutes}m
      </div>
    </div>
  );
}
