import React, { forwardRef, useState } from 'react'
import { Eye, EyeOff, AlertCircle, XCircle } from 'lucide-react'

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  required?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      helperText,
      error,
      required,
      leftIcon,
      rightIcon,
      clearable,
      onClear,
      type = 'text',
      className = '',
      containerClassName = '',
      labelClassName = '',
      inputClassName = '',
      errorClassName = '',
      disabled,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const hasValue = value !== undefined && value !== ''

    return (
      <div className={`flex flex-col gap-1.5 w-full text-left ${containerClassName}`}>
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={inputId}
              className={`text-xs font-medium text-slate-300 flex items-center gap-1 select-none tracking-wide ${
                disabled ? 'opacity-60 cursor-not-allowed' : ''
              } ${labelClassName}`}
            >
              {label}
              {required && <span className="text-rose-400 font-semibold ml-0.5">*</span>}
            </label>
          </div>
        )}

        <div className="relative flex items-center group">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors duration-200">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            value={value}
            aria-invalid={!!error}
            className={`w-full bg-slate-900/80 text-slate-100 text-xs sm:text-sm rounded-lg border px-3.5 py-2.5 transition-all duration-200 outline-none placeholder:text-slate-500 shadow-xs border-slate-800 hover:border-slate-700 focus:border-blue-500/80 focus:ring-3 focus:ring-blue-500/15 focus:bg-slate-900 ${
              leftIcon ? 'pl-9.5' : ''
            } ${rightIcon || isPassword || (clearable && hasValue && !disabled && !isPassword && onClear) ? 'pr-9.5' : ''} ${
              error
                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20 text-rose-50 placeholder:text-rose-300/40 bg-rose-950/10'
                : ''
            } ${
              disabled
                ? 'opacity-50 cursor-not-allowed bg-slate-900/40 border-slate-800/60 text-slate-500 shadow-none'
                : ''
            } ${inputClassName} ${className}`}
            {...props}
          />

          {clearable && hasValue && !disabled && !isPassword && onClear && (
            <button
              type="button"
              tabIndex={-1}
              onClick={onClear}
              className="absolute right-3 p-1 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 focus:outline-none transition-colors"
            >
              <XCircle className="w-3.5 h-3.5" />
            </button>
          )}

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 focus:outline-none transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}

          {!isPassword && !clearable && rightIcon && (
            <div className="absolute right-3 flex items-center pointer-events-none text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

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

TextInput.displayName = 'TextInput'
