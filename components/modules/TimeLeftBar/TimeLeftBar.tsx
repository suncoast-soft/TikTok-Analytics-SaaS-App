const getTimeComponents = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  return { days, hours, minutes };
};

export default function TimeLeftBar({
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
  const timeLeft = Math.max(0, endDate.getTime() - now.getTime());

  const { days, hours, minutes } = getTimeComponents(timeLeft);
  const progress =
    (Math.max(0, totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
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
