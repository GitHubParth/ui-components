import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, AlertCircle, Search, X } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  badge?: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  searchable?: boolean
  clearable?: boolean
  containerClassName?: string
  labelClassName?: string
  buttonClassName?: string
  menuClassName?: string
  errorClassName?: string
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  helperText,
  error,
  required,
  disabled,
  searchable = false,
  clearable = false,
  containerClassName = '',
  labelClassName = '',
  buttonClassName = '',
  menuClassName = '',
  errorClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  const filteredOptions = searchable
    ? options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opt.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
  }

  return (
    <div className={`flex flex-col gap-1.5 w-full text-left relative ${containerClassName}`} ref={dropdownRef}>
      {label && (
        <label
          className={`text-xs font-medium text-slate-300 flex items-center gap-1 select-none tracking-wide ${
            disabled ? 'opacity-60 cursor-not-allowed' : ''
          } ${labelClassName}`}
        >
          {label}
          {required && <span className="text-rose-400 font-semibold ml-0.5">*</span>}
        </label>
      )}

      <div>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full min-h-10.5 flex items-center justify-between bg-slate-900/80 text-slate-100 text-xs sm:text-sm rounded-lg border px-3.5 py-2 transition-all duration-200 outline-none text-left shadow-xs border-slate-800 hover:border-slate-700 ${
            isOpen ? 'border-blue-500/80 ring-3 ring-blue-500/15 bg-slate-900' : ''
          } ${error ? 'border-rose-500/80 ring-rose-500/20 text-rose-100 bg-rose-950/10' : ''} ${
            disabled ? 'opacity-50 cursor-not-allowed bg-slate-900/40 border-slate-800/60 text-slate-500 shadow-none' : ''
          } ${buttonClassName}`}
        >
          <div className="flex items-center gap-2.5 truncate flex-1 pr-2">
            {selectedOption?.icon && (
              <span className="shrink-0 text-slate-400">{selectedOption.icon}</span>
            )}
            <span className={`truncate ${!selectedOption ? 'text-slate-500' : ''}`}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
            {clearable && selectedOption && !disabled && (
              <span
                role="button"
                onClick={handleClear}
                className="hover:text-slate-200 p-0.5 rounded transition-colors"
                title="Clear selection"
              >
                <X className="w-3.5 h-3.5" />
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'
              }`}
            />
          </div>
        </button>

        {isOpen && (
          <div
            className={`absolute z-50 mt-1.5 w-full bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-xl shadow-black/50 overflow-hidden text-xs sm:text-sm animate-in fade-in-50 zoom-in-95 ${menuClassName}`}
          >
            {searchable && (
              <div className="p-2 border-b border-slate-800/80 bg-slate-950/50">
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter options..."
                    className="w-full bg-slate-900 text-xs text-slate-200 pl-8 pr-7 py-1.5 rounded-lg border border-slate-800 focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/15 focus:outline-none placeholder:text-slate-500"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 text-slate-500 hover:text-slate-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            <ul className="max-h-60 overflow-y-auto p-1.5 space-y-0.5 focus:outline-none">
              {filteredOptions.length === 0 ? (
                <li className="p-3 text-xs text-slate-500 text-center">No options found</li>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = option.value === value
                  return (
                    <li
                      key={option.value}
                      onClick={() => {
                        if (option.disabled) return
                        onChange(option.value)
                        setIsOpen(false)
                        setSearchQuery('')
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer select-none transition-all duration-150 text-xs ${
                        isSelected
                          ? 'bg-blue-600/15 text-blue-300 font-medium'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
                      } ${option.disabled ? 'opacity-40 cursor-not-allowed hover:bg-transparent' : ''}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {option.icon && <span className="shrink-0">{option.icon}</span>}
                        <div className="flex flex-col min-w-0">
                          <span className="truncate font-medium">{option.label}</span>
                          {option.description && (
                            <span className="text-xs text-slate-400 font-normal truncate mt-0.5">
                              {option.description}
                            </span>
                          )}
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0 ml-2 stroke-2" />}
                    </li>
                  )
                })
              )}
            </ul>
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
