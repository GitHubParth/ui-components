import React, { forwardRef } from 'react'
import type { ButtonVariant, ButtonSize } from './Button'
import { Loader2 } from 'lucide-react'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  shape?: 'circle' | 'square' | 'rounded'
  tooltip?: string
  ariaLabel?: string
}

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

const SIZE_STYLES: Record<ButtonSize, { box: string; iconSize: string }> = {
  default: { box: 'w-9 h-9', iconSize: 'w-4 h-4' },
  icon: { box: 'w-9 h-9', iconSize: 'w-4 h-4' },
  xs: { box: 'w-7 h-7', iconSize: 'w-3.5 h-3.5' },
  sm: { box: 'w-8 h-8', iconSize: 'w-3.5 h-3.5' },
  md: { box: 'w-9 h-9', iconSize: 'w-4 h-4' },
  lg: { box: 'w-10.5 h-10.5', iconSize: 'w-5 h-5' },
}

const SHAPE_STYLES = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-md',
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'secondary',
      size = 'default',
      shape = 'rounded',
      isLoading = false,
      tooltip,
      ariaLabel,
      disabled,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading
    const variantClass = VARIANT_MAP[variant] || VARIANT_MAP.secondary
    const sizeConfig = SIZE_STYLES[size] || SIZE_STYLES.default
    const shapeClass = SHAPE_STYLES[shape] || SHAPE_STYLES.rounded

    const label = ariaLabel || tooltip || 'Action button'

    return (
      <div className="relative inline-flex group/tooltip">
        <button
          ref={ref}
          type={type}
          disabled={isDisabled}
          aria-label={label}
          className={`inline-flex items-center justify-center transition-all duration-150 outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 active:scale-[0.98] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeConfig.box} ${shapeClass} ${variantClass} ${className}`}
          {...props}
        >
          {isLoading ? (
            <Loader2 className={`${sizeConfig.iconSize} animate-spin text-current`} />
          ) : (
            icon
          )}
        </button>

        {tooltip && !isDisabled && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-950 text-slate-100 text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 border border-slate-800 shadow-md">
            {tooltip}
          </div>
        )}
      </div>
    )
  }
)

IconButton.displayName = 'IconButton'
