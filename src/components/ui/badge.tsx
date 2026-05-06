import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
        outline: 'border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300',
        accent:
          'border-transparent bg-[oklch(0.95_0.04_28)] text-[oklch(0.42_0.13_28)] dark:bg-[oklch(0.36_0.10_28)] dark:text-[oklch(0.94_0.04_28)]',
        warning:
          'border-transparent bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200',
        destructive:
          'border-transparent bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
