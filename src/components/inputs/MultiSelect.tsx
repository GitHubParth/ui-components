import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, AlertCircle, Search, X } from 'lucide-react'

export interface MultiSelectOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  badgeColor?: string
  disabled?: boolean
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  searchable?: boolean
  maxVisibleTags?: number
  containerClassName?: string
  labelClassName?: string
  buttonClassName?: string
  menuClassName?: string
  errorClassName?: string
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onChange,
  label,
  placeholder = 'Select multiple...',
  helperText,
  error,
  required,
  disabled,
  searchable = true,
  maxVisibleTags = 3,
  containerClassName = '',
  labelClassName = '',
  buttonClassName = '',
  menuClassName = '',
  errorClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOptions = options.filter((opt) => value.includes(opt.value))

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

  const toggleOption = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue))
    } else {
      onChange([...value, optValue])
    }
  }

  const removeOption = (e: React.MouseEvent, optValue: string) => {
    e.stopPropagation()
    onChange(value.filter((v) => v !== optValue))
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
  }

  const isAllSelected = options.length > 0 && value.length === options.length

  const toggleSelectAll = () => {
    if (isAllSelected) {
      onChange([])
    } else {
      onChange(options.filter((o) => !o.disabled).map((o) => o.value))
    }
  }

  return (
    <div className={`flex flex-col gap-1.5 w-full text-left relative ${containerClassName}`} ref={dropdownRef}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            className={`text-xs font-medium text-slate-300 flex items-center gap-1 select-none tracking-wide ${
              disabled ? 'opacity-60 cursor-not-allowed' : ''
            } ${labelClassName}`}
          >
            {label}
            {required && <span className="text-rose-400 font-semibold ml-0.5">*</span>}
          </label>
          {selectedOptions.length > 0 && (
            <span className="text-xs text-slate-400 font-medium">
              {selectedOptions.length} of {options.length} selected
            </span>
          )}
        </div>
      )}

      <div>
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full min-h-10.5 flex items-center justify-between bg-slate-900/80 text-slate-100 text-xs sm:text-sm rounded-lg border px-3 py-1.5 transition-all duration-200 outline-none cursor-pointer shadow-xs border-slate-800 hover:border-slate-700 ${
            isOpen ? 'border-blue-500/80 ring-3 ring-blue-500/15 bg-slate-900' : ''
          } ${error ? 'border-rose-500/80 ring-rose-500/20 bg-rose-950/10' : ''} ${
            disabled ? 'opacity-50 cursor-not-allowed bg-slate-900/40 border-slate-800/60 shadow-none' : ''
          } ${buttonClassName}`}
        >
          <div className="flex flex-wrap items-center gap-1.5 flex-1 pr-2 py-0.5">
            {selectedOptions.length === 0 ? (
              <span className="text-slate-500 text-xs sm:text-sm pl-1">{placeholder}</span>
            ) : (
              <>
                {selectedOptions.slice(0, maxVisibleTags).map((opt) => (
                  <span
                    key={opt.value}
                    className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs px-2.5 py-1 rounded-md font-medium shadow-xs"
                  >
                    {opt.icon && <span className="w-3.5 h-3.5 text-slate-400 flex items-center">{opt.icon}</span>}
                    <span className="truncate max-w-30">{opt.label}</span>
                    {!disabled && (
                      <button
                        type="button"
                        onClick={(e) => removeOption(e, opt.value)}
                        className="text-slate-400 hover:text-rose-400 focus:outline-none transition-colors p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
                {selectedOptions.length > maxVisibleTags && (
                  <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md font-mono font-medium">
                    +{selectedOptions.length - maxVisibleTags} more
                  </span>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-slate-400 pl-1">
            {selectedOptions.length > 0 && !disabled && (
              <button
                type="button"
                onClick={clearAll}
                className="hover:text-slate-200 p-1 rounded-md hover:bg-slate-800 transition-colors"
                title="Clear all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'
              }`}
            />
          </div>
        </div>

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
                    placeholder="Search scopes or permissions..."
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

            <div className="flex items-center justify-between px-3 py-2 bg-slate-950/30 border-b border-slate-800/80 text-xs text-slate-400 font-medium">
              <span>{value.length} selected</span>
              <button
                type="button"
                onClick={toggleSelectAll}
                className="text-blue-400 hover:text-blue-300 font-medium cursor-pointer transition-colors"
              >
                {isAllSelected ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <ul className="max-h-60 overflow-y-auto p-1.5 space-y-0.5 focus:outline-none">
              {filteredOptions.length === 0 ? (
                <li className="p-3 text-xs text-slate-500 text-center">No matching options</li>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = value.includes(option.value)
                  return (
                    <li
                      key={option.value}
                      onClick={() => {
                        if (option.disabled) return
                        toggleOption(option.value)
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer select-none transition-all duration-150 text-xs ${
                        isSelected
                          ? 'bg-blue-600/15 text-blue-300 font-medium'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
                      } ${option.disabled ? 'opacity-40 cursor-not-allowed hover:bg-transparent' : ''}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                            isSelected
                              ? 'bg-blue-600 border-blue-500 text-white shadow-xs shadow-blue-500/30'
                              : 'border-slate-700 bg-slate-950/50'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-2" />}
                        </div>
                        {option.icon && <span className="shrink-0 text-slate-400">{option.icon}</span>}
                        <div className="flex flex-col min-w-0">
                          <span className="truncate font-medium">{option.label}</span>
                          {option.description && (
                            <span className="text-xs text-slate-400 font-normal truncate mt-0.5">
                              {option.description}
                            </span>
                          )}
                        </div>
                      </div>
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
