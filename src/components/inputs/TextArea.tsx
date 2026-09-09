import React, { forwardRef } from 'react'
import { AlertCircle } from 'lucide-react'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  required?: boolean
  containerClassName?: string
  labelClassName?: string
  textareaClassName?: string
  errorClassName?: string
  showCount?: boolean
  maxLength?: number
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      required,
      className = '',
      containerClassName = '',
      labelClassName = '',
      textareaClassName = '',
      errorClassName = '',
      disabled,
      id,
      value,
      maxLength,
      showCount,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const currentLength = typeof value === 'string' ? value.length : 0
    const isNearLimit = maxLength ? currentLength >= maxLength * 0.9 : false

    return (
      <div className={`flex flex-col gap-1.5 w-full text-left ${containerClassName}`}>
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={inputId}
              className={`text-xs font-medium text-slate-300 flex items-center gap-1 select-none tracking-wide ${
                disabled ? 'opacity-60 cursor-not-allowed' : ''
              } ${labelClassName}`}
            >
              {label}
              {required && <span className="text-rose-400 font-semibold ml-0.5">*</span>}
            </label>
          )}

          {showCount && maxLength && (
            <span
              className={`text-xs font-mono transition-colors ${
                isNearLimit ? 'text-amber-400 font-medium' : 'text-slate-400'
              }`}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>

        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          value={value}
          maxLength={maxLength}
          aria-invalid={!!error}
          className={`w-full bg-slate-900/80 text-slate-100 text-xs sm:text-sm rounded-lg border px-3.5 py-2.5 min-h-24 transition-all duration-200 outline-none placeholder:text-slate-500 resize-y shadow-xs leading-relaxed border-slate-800 hover:border-slate-700 focus:border-blue-500/80 focus:ring-3 focus:ring-blue-500/15 focus:bg-slate-900 ${
            error
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20 text-rose-50 placeholder:text-rose-300/40 bg-rose-950/10'
              : ''
          } ${
            disabled
              ? 'opacity-50 cursor-not-allowed bg-slate-900/40 border-slate-800/60 text-slate-500 shadow-none'
              : ''
          } ${textareaClassName} ${className}`}
          {...props}
        />

        {error ? (
          <div
            className={`flex items-center gap-1.5 text-xs text-rose-400 font-medium animate-fadeIn pt-0.5 ${errorClassName}`}
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : helperText ? (
          <p className="text-xs text-slate-500 pt-0.5 leading-normal">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
