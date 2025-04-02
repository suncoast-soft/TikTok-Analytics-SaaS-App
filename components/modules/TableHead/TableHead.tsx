'use client';

import { TableHead } from '@/components/ui/table';
import { cn } from '@/utils/cn';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

export default function TableHeadSort({
  sortField,
  className,
  children
}: {
  sortField?: string;
  className?: string;
  children?: ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSortField = searchParams.get('sort_field') ?? 'gmv';
  const currentSortOrder = searchParams.get('sort_order') ?? 'DESC';

  const handleSort = (sortField: string) => {
    const newSortOrder =
      currentSortField === sortField && currentSortOrder === 'DESC'
        ? 'ASC'
        : 'DESC';

    const params = new URLSearchParams(searchParams.toString());
    params.set('sort_field', sortField);
    params.set('sort_order', newSortOrder);
    router.push(`?${params.toString()}`);
  };

  if (sortField) {
    return (
      <TableHead
        onClick={() => handleSort(sortField)}
        className={cn('hover:bg-navy-600 cursor-pointer', className)}
      >
        <div
          className={cn(
            'flex items-center gap-1 text-navy-50',
            sortField === currentSortField && 'text-navy-400 font-semibold'
          )}
        >
          {children}
          {sortField === currentSortField &&
            (currentSortOrder === 'DESC' ? (
              <ArrowDownIcon size={16} />
            ) : (
              <ArrowUpIcon size={16} />
            ))}
        </div>
      </TableHead>
    );
  } else {
    return <TableHead className={className}>{children}</TableHead>;
  }
}
