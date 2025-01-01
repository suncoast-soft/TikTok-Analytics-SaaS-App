import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { XIcon } from 'lucide-react'

export default function CreatorFilter({
  label,
  options,
  value,
  setValue,
  className
}: {
  label: string
  options: string[]
  value: string
  setValue: Function
  className?: string
}) {
  return (
    <Select value={value} onValueChange={(value) => setValue(value)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function CreatorFilterClear({
  label,
  value,
  setValue
}: {
  label: string
  value: string
  setValue: Function
}) {
  return (
    <div className="bg-secondary text-black rounded px-2 flex items-center gap-1">
      <span>{label}:</span>
      <span className="font-semibold">{value}</span>
      <XIcon
        size={16}
        className="bg-black text-white rounded-full ml-2"
        onClick={() => setValue('')}
      />
    </div>
  )
}
