import React, { useState, useRef, useEffect } from 'react'
import { Clock, AlertCircle, X } from 'lucide-react'

export interface TimePickerProps {
  value?: string // HH:mm or HH:mm:ss
  onChange: (time: string) => void
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  use12Hours?: boolean
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value = '',
  onChange,
  label,
  placeholder = 'Select time...',
  helperText,
  error,
  required,
  disabled,
  use12Hours = true,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Parse current value
  const [selectedHour, setSelectedHour] = useState('12')
  const [selectedMinute, setSelectedMinute] = useState('00')
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>('PM')

  useEffect(() => {
    if (value) {
      const parts = value.split(':')
      if (parts.length >= 2) {
        let h = parseInt(parts[0], 10)
        const m = parts[1]
        if (use12Hours) {
          const period = h >= 12 ? 'PM' : 'AM'
          if (h > 12) h -= 12
          if (h === 0) h = 12
          setSelectedHour(String(h).padStart(2, '0'))
          setSelectedMinute(m.slice(0, 2))
          setSelectedPeriod(period)
        } else {
          setSelectedHour(String(h).padStart(2, '0'))
          setSelectedMinute(m.slice(0, 2))
        }
      }
    }
  }, [value, use12Hours])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const emitTime = (h: string, m: string, p?: 'AM' | 'PM') => {
    if (use12Hours) {
      let numericHour = parseInt(h, 10)
      const period = p || selectedPeriod
      if (period === 'PM' && numericHour < 12) numericHour += 12
      if (period === 'AM' && numericHour === 12) numericHour = 0
      const formatted24 = `${String(numericHour).padStart(2, '0')}:${m}`
      onChange(formatted24)
    } else {
      onChange(`${h}:${m}`)
    }
  }

  const hours = use12Hours
    ? Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
    : Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))

  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']

  const displayTime = () => {
    if (!value) return ''
    if (use12Hours) {
      const parts = value.split(':')
      let h = parseInt(parts[0], 10)
      const m = parts[1]
      const period = h >= 12 ? 'PM' : 'AM'
      if (h > 12) h -= 12
      if (h === 0) h = 12
      return `${h}:${m} ${period}`
    }
    return value
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
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span className={!value ? 'text-slate-500' : 'text-slate-100 font-medium'}>
              {displayTime() || placeholder}
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
          <div className="absolute z-50 mt-1.5 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl shadow-black/60 p-3 animate-in fade-in-50 zoom-in-95">
            <div className="text-xs font-semibold text-slate-200 pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Select Time</span>
              {use12Hours && (
                <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPeriod('AM')
                      emitTime(selectedHour, selectedMinute, 'AM')
                    }}
                    className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                      selectedPeriod === 'AM'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPeriod('PM')
                      emitTime(selectedHour, selectedMinute, 'PM')
                    }}
                    className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                      selectedPeriod === 'PM'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    PM
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2.5">
              {/* Hours List */}
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-400 mb-1 text-center">
                  Hour
                </span>
                <div className="max-h-40 overflow-y-auto space-y-1 p-1 bg-slate-950/60 rounded-lg border border-slate-800">
                  {hours.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => {
                        setSelectedHour(h)
                        emitTime(h, selectedMinute)
                      }}
                      className={`w-full py-1 text-xs rounded transition-colors text-center font-mono ${
                        selectedHour === h
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minutes List */}
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-400 mb-1 text-center">
                  Minute
                </span>
                <div className="max-h-40 overflow-y-auto space-y-1 p-1 bg-slate-950/60 rounded-lg border border-slate-800">
                  {minutes.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setSelectedMinute(m)
                        emitTime(selectedHour, m)
                      }}
                      className={`w-full py-1 text-xs rounded transition-colors text-center font-mono ${
                        selectedMinute === m
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
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
