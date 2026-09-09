import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnOutsideClick?: boolean
  closeOnEsc?: boolean
  className?: string
}

const SIZE_STYLES = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] h-[90vh]',
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeOnEsc, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => closeOnOutsideClick && onClose()}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${SIZE_STYLES[size]} bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden flex flex-col z-10 animate-in zoom-in-95 fade-in duration-200 ${className}`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-5 border-b border-slate-800/80 shrink-0">
            <div className="flex flex-col min-w-0 pr-4">
              {typeof title === 'string' ? (
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {title}
                </h3>
              ) : (
                title
              )}
              {description && (
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{description}</p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 bg-slate-950/40 border-t border-slate-800/80 flex items-center justify-end gap-2.5 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
