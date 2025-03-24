import { format, parseISO } from 'date-fns';

export const getURL = (path: string = '') => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          'http://localhost:3000/';

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, '');
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, '');

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
): string => {
  const toastKeyMap: { [key: string]: string[] } = {
    status: ['status', 'status_description'],
    error: ['error', 'error_description']
  };

  const [nameKey, descriptionKey] = toastKeyMap[toastType];

  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`;

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(toastDescription)}`;
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`;
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`;
  }

  return redirectPath;
};

export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'status',
    statusName,
    statusDescription,
    disableButton,
    arbitraryParams
  );

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'error',
    errorName,
    errorDescription,
    disableButton,
    arbitraryParams
  );

export const getInitials = (nameOrEmail: string): string => {
  if (!nameOrEmail) return '';

  const nameParts = nameOrEmail.split(' ');

  if (nameParts.length === 1) {
    const emailName = nameParts[0].split('@')[0];
    return emailName.charAt(0).toUpperCase();
  }

  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
  return initials;
};

export const getTimeDiff = (start_time: number, end_time: number) => {
  const getTimeComponents = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));

    return { days, hours };
  };

  const startDate = new Date(start_time * 1000);
  const endDate = new Date(end_time * 1000);
  const now = new Date();

  const totalDuration = endDate.getTime() - startDate.getTime();
  const timeLeft =
    startDate > now
      ? Math.max(0, startDate.getTime() - now.getTime())
      : Math.max(0, endDate.getTime() - now.getTime());

  const { days, hours } = getTimeComponents(timeLeft);

  const text =
    now > endDate
      ? 'Ended'
      : startDate > now
        ? `Starts in ${days}d ${hours}h`
        : `Ends in ${days}d ${hours}h`;

  const progress =
    now > endDate
      ? -1
      : startDate > now
        ? 0
        : (Math.max(0, totalDuration - timeLeft) / totalDuration) * 100;

  return { text, progress };
};

export const displayDate = (
  dateValue: string | Date | number | null,
  pattern?: string
): string => {
  if (!dateValue) return '';

  try {
    let date: Date;
    if (typeof dateValue === 'string') {
      date = parseISO(dateValue);
    } else if (typeof dateValue === 'number') {
      date = new Date(dateValue);
    } else {
      date = dateValue;
    }

    return format(date, pattern ?? 'PPP');
  } catch {
    return '';
  }
};

export const checkReward = (
  rewards: {
    target: number;
    reward: number;
  }[],
  gmv: number
): number => {
  let reward = 0;
  for (const milestone of rewards) {
    if (gmv >= milestone.target) {
      reward = milestone.reward;
    }
  }
  return reward;
};
