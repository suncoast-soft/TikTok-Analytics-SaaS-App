import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/utils/cn';
import { Pencil } from 'lucide-react';

interface ModuleProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function FormTextarea({
  control,
  name,
  label,
  placeholder,
  required,
  className
}: ModuleProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel className="text-white font-semibold text-lg">
            <span>{label}</span>
            {required && <span className="text-secondary p-1">*</span>}
          </FormLabel>

          <FormControl>
            <div className="relative">
              <div className="absolute left-4 top-6 transform -translate-y-1/2">
                <Pencil className="w-5 text-primary" />
              </div>

              <Textarea
                placeholder={placeholder || label}
                {...field}
                className="bg-transparent py-3 border border-navy-300 focus:border-navy-500 text-navy-200 [&::placeholder]:text-navy-200/60 pl-10"
              />
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
