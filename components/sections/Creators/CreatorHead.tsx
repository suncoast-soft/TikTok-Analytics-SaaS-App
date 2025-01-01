import { TableHead } from '@/components/ui/table'
import { cn } from '@/utils/cn'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

export default function CreatorHead({
  label,
  sort,
  setSort,
  sortDirection,
  activeSort,
  className
}: {
  label: string
  sort?: string
  setSort?: Function
  sortDirection?: boolean
  activeSort?: string | null
  className?: string
}) {
  if (sort && setSort) {
    return (
      <TableHead onClick={() => setSort(sort)} className={className}>
        <div
          className={cn(
            'flex items-center gap-1',
            sort === activeSort && 'text-blue-800'
          )}
        >
          {label}
          {sort === activeSort && sortDirection ? (
            <ArrowDownIcon size={16} />
          ) : (
            <ArrowUpIcon size={16} />
          )}
        </div>
      </TableHead>
    )
  } else {
    return <TableHead className={className}>{label}</TableHead>
  }
}
