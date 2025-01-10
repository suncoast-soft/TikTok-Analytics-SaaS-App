import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-slate-50 hover:bg-primary/90 dark:bg-slate-50 dark:text-primary dark:hover:bg-slate-50/90',
        outline:
          'bg-white text-primary font-semibold rounded-lg shadow-md hover:bg-slate-100 outline-none ring-2 ring-offset-2 ring-secondary',
        destructive:
          'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        link: 'text-primary underline-offset-4 hover:underline dark:text-slate-50',
        white:
          'px-8 py-3 bg-white text-primary font-semibold rounded-md shadow hover:bg-slate-100 transition transform hover:scale-105',
        glassy: 'relative inline-block font-medium group',
        secondary:
          'bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80',
        ghost:
          'hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    const glassyInnerSpanClasses =
      variant === 'glassy'
        ? 'absolute inset-0 transition-transform transform translate-x-1 translate-y-1 bg-primary group-hover:-translate-x-0 group-hover:-translate-y-0'
        : ''
    const glassyBorderSpanClasses =
      variant === 'glassy' ? 'absolute inset-0 border-2 border-black' : ''
    const glassyContentSpanClasses =
      variant === 'glassy'
        ? 'relative block text-white bg-opacity-5 backdrop-blur-md bg-black px-8 py-3 transition-colors duration-300 ease group-hover:bg-opacity-30'
        : ''

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          variant === 'glassy' && 'px-0 py-0 h-auto'
        )}
        ref={ref}
        {...props}
      >
        {variant === 'glassy' ? (
          <div>
            <span className={glassyInnerSpanClasses}></span>
            <span className={glassyBorderSpanClasses}></span>
            <span className={glassyContentSpanClasses}>{props.children}</span>
          </div>
        ) : (
          props.children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
