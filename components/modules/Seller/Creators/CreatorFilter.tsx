import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function CreatorFilter({
  label,
  options,
  setValue,
  className
}: {
  label: string
  options: string[]
  setValue: Function
  className?: string
}) {
  return (
    <Select onValueChange={(value) => setValue(value)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, index) => (
            <SelectItem value={option}>{option.toWellFormed()}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
