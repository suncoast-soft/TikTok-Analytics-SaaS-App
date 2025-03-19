'use client';

import { format, subDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface DatePickerWithRangeProps {
  date: DateRange | undefined;
  className?: string;
}

export default function DatePickerWithRange({
  date: initialDate,
  className
}: DatePickerWithRangeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [date, setDate] = useState(initialDate);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSelectChange = (value: string) => {
    const days = parseInt(value);
    if (!isNaN(days)) {
      setDate({
        from: subDays(new Date(), days),
        to: new Date()
      });
    }
  };

  const handleCalendarSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('start_date', format(range.from, 'yyyy-MM-dd'));
      params.set('end_date', format(range.to, 'yyyy-MM-dd'));

      router.push(`?${params.toString()}`);
      setIsPopoverOpen(false);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            size="sm"
            className={cn(
              'w-[260px] justify-start text-left font-normal mb-4 ml-auto',
              !date && 'text-muted-foreground'
            )}
            onClick={() => setIsPopoverOpen((prev) => !prev)}
          >
            <CalendarIcon className="mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'MMM dd, y')} -{' '}
                  {format(date.to, 'MMM dd, y')}
                </>
              ) : (
                format(date.from, 'MMM dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto px-5 py-0 bg-none border-none"
          align="start"
        >
          <div className="bg-navy-600">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-navy-300">
                <SelectValue placeholder="Select Date Range" />
              </SelectTrigger>
              <SelectContent position="popper" className="bg-navy-500">
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="28">Last 28 days</SelectItem>
                <SelectItem value="90">Last 3 months</SelectItem>
              </SelectContent>
            </Select>

            <Calendar
              autoFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(range) => setDate(range)}
              numberOfMonths={2}
            />

            <div className="px-4 pb-4 text-right">
              <Button
                variant="outline"
                onClick={() => handleCalendarSelect(date)}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
