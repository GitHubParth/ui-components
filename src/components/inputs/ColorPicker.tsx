import React, { useState, useRef, useEffect } from 'react'
import { Palette, AlertCircle, Check, Copy } from 'lucide-react'

export interface ColorPickerProps {
  value?: string // hex string e.g. #3B82F6
  onChange: (color: string) => void
  label?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  swatches?: string[]
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
}

const DEFAULT_SWATCHES = [
  '#2563EB', '#3B82F6', '#60A5FA', // Blues
  '#4F46E5', '#6366F1', '#818CF8', // Indigos
  '#059669', '#10B981', '#34D399', // Emeralds
  '#D97706', '#F59E0B', '#FBBF24', // Ambers
  '#E11D48', '#F43F5E', '#FB7185', // Roses
  '#7C3AED', '#8B5CF6', '#A78BFA', // Purples
  '#0F172A', '#334155', '#64748B', // Slates
  '#FFFFFF', '#000000', '#6B7280', // Neutrals
]

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value = '#3B82F6',
  onChange,
  label,
  helperText,
  error,
  required,
  disabled,
  swatches = DEFAULT_SWATCHES,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const copyHex = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
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
          <div className="flex items-center gap-2.5">
            <span
              className="w-5 h-5 rounded-md border border-white/20 shadow-xs shrink-0"
              style={{ backgroundColor: value }}
            />
            <span className="font-mono text-xs text-slate-200 font-medium">{value}</span>
          </div>

          <Palette className="w-4 h-4 text-slate-400 shrink-0" />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1.5 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl shadow-black/60 p-3.5 animate-in fade-in-50 zoom-in-95">
            {/* Color preview bar + Native picker */}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 opacity-0 absolute inset-0"
                />
                <div
                  className="w-8 h-8 rounded-lg border border-white/20 shadow-inner"
                  style={{ backgroundColor: value }}
                />
              </div>

              <div className="flex-1 flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1">
                <span className="font-mono text-xs text-slate-300 flex-1">{value.toUpperCase()}</span>
                <button
                  type="button"
                  onClick={copyHex}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                  title="Copy hex code"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Presets Swatches */}
            <div className="text-xs font-semibold text-slate-400 mb-2">Palette Presets</div>
            <div className="grid grid-cols-8 gap-1.5">
              {swatches.map((colorHex) => {
                const isSelected = value.toLowerCase() === colorHex.toLowerCase()
                return (
                  <button
                    key={colorHex}
                    type="button"
                    onClick={() => {
                      onChange(colorHex)
                      setIsOpen(false)
                    }}
                    style={{ backgroundColor: colorHex }}
                    className={`w-6 h-6 rounded-md border transition-all flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-white ring-2 ring-blue-500 ring-offset-1 ring-offset-slate-950 scale-110 shadow-md'
                        : 'border-white/10 hover:scale-105'
                    }`}
                  >
                    {isSelected && (
                      <Check className={`w-3 h-3 ${colorHex === '#FFFFFF' ? 'text-black' : 'text-white'} stroke-3`} />
                    )}
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
