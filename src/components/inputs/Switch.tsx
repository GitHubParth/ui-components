import React from 'react'
import { AlertCircle } from 'lucide-react'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  helperText?: string
  error?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  containerClassName?: string
  labelClassName?: string
  switchClassName?: string
  errorClassName?: string
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  helperText,
  error,
  disabled,
  required,
  size = 'md',
  containerClassName = '',
  labelClassName = '',
  switchClassName = '',
  errorClassName = '',
}) => {
  const sizeConfig = {
    sm: {
      track: 'w-7.5 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-3.5',
    },
    md: {
      track: 'w-9 h-5',
      thumb: 'w-4 h-4',
      translate: 'translate-x-4',
    },
    lg: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
  }[size]

  return (
    <div className={`flex flex-col gap-1 w-full text-left ${containerClassName}`}>
      <label
        className={`inline-flex items-start justify-between gap-3.5 cursor-pointer select-none group ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span
                className={`text-xs font-medium text-slate-200 flex items-center gap-1 group-hover:text-white transition-colors ${labelClassName}`}
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

        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          className={`relative inline-flex shrink-0 items-center rounded-full p-0.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-blue-500/20 shadow-inner ${
            sizeConfig.track
          } ${
            checked
              ? 'bg-blue-600 border border-blue-500'
              : 'bg-slate-800/90 border border-slate-700/80 group-hover:border-slate-600'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${switchClassName}`}
        >
          <span
            className={`pointer-events-none inline-block transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              sizeConfig.thumb
            } ${checked ? sizeConfig.translate : 'translate-x-0'}`}
          />
        </button>
      </label>

      {error ? (
        <div
          className={`flex items-center gap-1.5 text-xs text-rose-400 font-medium animate-fadeIn mt-0.5 ${errorClassName}`}
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="text-xs text-slate-500 mt-0.5 leading-normal">{helperText}</p>
      ) : null}
    </div>
  )
}
