import React, { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight, AlertCircle, X } from 'lucide-react'

export interface DatePickerProps {
  value?: string // YYYY-MM-DD
  onChange: (date: string) => void
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  minDate?: string
  maxDate?: string
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value = '',
  onChange,
  label,
  placeholder = 'YYYY-MM-DD',
  helperText,
  error,
  required,
  disabled,
  minDate,
  maxDate,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calendar navigation state
  const initialDate = value ? new Date(value) : new Date()
  const [viewYear, setViewYear] = useState(initialDate.getFullYear())
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth())

  useEffect(() => {
    if (value) {
      const d = new Date(value)
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear())
        setViewMonth(d.getMonth())
      }
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const handleSelectDay = (day: number) => {
    const mm = String(viewMonth + 1).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    const selected = `${viewYear}-${mm}-${dd}`
    onChange(selected)
    setIsOpen(false)
  }

  const handleQuickPreset = (preset: 'today' | 'tomorrow' | 'nextWeek') => {
    const target = new Date()
    if (preset === 'tomorrow') target.setDate(target.getDate() + 1)
    if (preset === 'nextWeek') target.setDate(target.getDate() + 7)
    const yyyy = target.getFullYear()
    const mm = String(target.getMonth() + 1).padStart(2, '0')
    const dd = String(target.getDate()).padStart(2, '0')
    onChange(`${yyyy}-${mm}-${dd}`)
    setIsOpen(false)
  }

  return (
    <div className={`flex flex-col gap-1.5 w-full text-left relative ${containerClassName}`} ref={containerRef}>
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

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full min-h-10.5 flex items-center justify-between bg-slate-900/80 text-slate-100 text-xs sm:text-sm rounded-lg border px-3.5 py-2 transition-all duration-200 outline-none text-left shadow-xs border-slate-800 hover:border-slate-700 ${
            isOpen ? 'border-blue-500/80 ring-3 ring-blue-500/15 bg-slate-900' : ''
          } ${error ? 'border-rose-500/80 ring-rose-500/20 text-rose-100 bg-rose-950/10' : ''} ${
            disabled ? 'opacity-50 cursor-not-allowed bg-slate-900/40 border-slate-800/60 text-slate-500 shadow-none' : ''
          } ${inputClassName}`}
        >
          <div className="flex items-center gap-2.5 truncate">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span className={!value ? 'text-slate-500' : 'text-slate-100 font-medium'}>
              {value || placeholder}
            </span>
          </div>

          {value && !disabled && (
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange('')
              }}
              className="p-1 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1.5 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl shadow-black/60 p-3 animate-in fade-in-50 zoom-in-95">
            {/* Header: Month / Year / Prev / Next */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-200">
                {monthNames[viewMonth]} {viewYear}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-slate-800/80">
              <button
                type="button"
                onClick={() => handleQuickPreset('today')}
                className="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('tomorrow')}
                className="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('nextWeek')}
                className="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                +1 Week
              </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="p-1" />
              ))}
              {Array.from({ length: daysInMonth(viewYear, viewMonth) }).map((_, i) => {
                const day = i + 1
                const mm = String(viewMonth + 1).padStart(2, '0')
                const dd = String(day).padStart(2, '0')
                const dateStr = `${viewYear}-${mm}-${dd}`
                const isSelected = value === dateStr
                const isToday =
                  new Date().toISOString().split('T')[0] === dateStr
                const isBeforeMin = minDate ? dateStr < minDate : false
                const isAfterMax = maxDate ? dateStr > maxDate : false
                const isDayDisabled = isBeforeMin || isAfterMax

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={isDayDisabled}
                    onClick={() => handleSelectDay(day)}
                    className={`p-1.5 text-xs rounded-md transition-all font-medium text-center ${
                      isSelected
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : isToday
                        ? 'border border-blue-500/50 text-blue-400 hover:bg-slate-800'
                        : isDayDisabled
                        ? 'opacity-30 cursor-not-allowed text-slate-600'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
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
