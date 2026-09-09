import React, { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'destructive'
  | 'danger'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'info'
  | 'glass'
  | 'shimmer'

export type ButtonSize = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

/**
 * Shadcn UI standard button styling variants with enterprise dark/light compatibility
 */
const VARIANT_MAP: Record<ButtonVariant, string> = {
  default:
    'bg-slate-900 text-slate-50 shadow-xs hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 border border-transparent',
  primary:
    'bg-blue-600 text-white shadow-xs hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 border border-transparent focus-visible:ring-blue-500',
  destructive:
    'bg-rose-600 text-white shadow-xs hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 border border-transparent focus-visible:ring-rose-500',
  danger:
    'bg-rose-600 text-white shadow-xs hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 border border-transparent focus-visible:ring-rose-500',
  outline:
    'border border-slate-200 bg-white shadow-xs hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 text-slate-700 dark:text-slate-200',
  secondary:
    'bg-slate-100 text-slate-900 shadow-xs hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700/80 border border-transparent',
  ghost:
    'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 text-slate-600 dark:text-slate-400 border border-transparent',
  link:
    'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400 p-0 h-auto font-medium shadow-none border-none bg-transparent',
  info:
    'bg-sky-600 text-white shadow-xs hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 border border-transparent focus-visible:ring-sky-500',
  glass:
    'bg-slate-800/60 backdrop-blur-md border border-slate-700/60 text-slate-100 hover:bg-slate-800/80 shadow-xs',
  shimmer:
    'relative bg-slate-900 text-slate-100 border border-slate-800 hover:border-slate-700 shadow-xs overflow-hidden dark:bg-slate-950',
}

const SIZE_MAP: Record<ButtonSize, string> = {
  default: 'h-9 px-4 py-2 text-sm',
  xs: 'h-7 px-2.5 text-xs',
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 py-2 text-sm',
  lg: 'h-10.5 px-6 text-base',
  icon: 'h-9 w-9 p-0',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'default',
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading
    const variantClass = VARIANT_MAP[variant] || VARIANT_MAP.default
    const sizeClass = SIZE_MAP[size] || SIZE_MAP.default

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98] shrink-0 ${variantClass} ${sizeClass} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        {...props}
      >
        {variant === 'shimmer' && !isDisabled && (
          <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
        )}

        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin shrink-0 text-current" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children && <span>{children}</span>}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
