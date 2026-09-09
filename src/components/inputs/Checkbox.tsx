import React, { forwardRef } from 'react'
import { Check, Minus, AlertCircle } from 'lucide-react'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  checked: boolean
  onChange: (checked: boolean) => void
  indeterminate?: boolean
  label?: React.ReactNode
  description?: string
  helperText?: string
  error?: string
  required?: boolean
  containerClassName?: string
  labelClassName?: string
  checkboxClassName?: string
  errorClassName?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      onChange,
      indeterminate = false,
      label,
      description,
      helperText,
      error,
      required,
      disabled,
      className = '',
      containerClassName = '',
      labelClassName = '',
      checkboxClassName = '',
      errorClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className={`flex flex-col gap-1 w-full text-left ${containerClassName}`}>
        <label
          htmlFor={inputId}
          className={`inline-flex items-start gap-3 cursor-pointer select-none group ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <div className="relative flex items-center pt-0.5">
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={(e) => onChange(e.target.checked)}
              className="sr-only"
              {...props}
            />

            <div
              className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all duration-150 shrink-0 shadow-xs ${
                checked || indeterminate
                  ? 'bg-blue-600 border-blue-500 text-white shadow-blue-500/20'
                  : 'bg-slate-900/80 border-slate-700/90 group-hover:border-slate-500'
              } group-focus-within:ring-3 group-focus-within:ring-blue-500/20 ${
                error ? 'border-rose-500 bg-rose-950/20' : ''
              } ${
                disabled ? 'opacity-60 cursor-not-allowed border-slate-800 bg-slate-900/40 shadow-none' : ''
              } ${checkboxClassName} ${className}`}
            >
              {indeterminate ? (
                <Minus className="w-3.5 h-3.5 stroke-2" />
              ) : checked ? (
                <Check className="w-3.5 h-3.5 stroke-2" />
              ) : null}
            </div>
          </div>

          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <span
                  className={`text-xs font-medium text-slate-200 group-hover:text-white transition-colors flex items-center gap-1 ${labelClassName}`}
                >
                  {label}
                  {required && <span className="text-rose-400 font-semibold ml-0.5">*</span>}
                </span>
              )}
              {description && (
                <span className="text-xs text-slate-400 font-normal leading-relaxed mt-0.5">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>

        {error ? (
          <div
            className={`flex items-center gap-1.5 text-xs text-rose-400 font-medium animate-fadeIn ml-7.5 pt-0.5 ${errorClassName}`}
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : helperText ? (
          <p className="text-xs text-slate-500 ml-7.5 pt-0.5 leading-normal">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
