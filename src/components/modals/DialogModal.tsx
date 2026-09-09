import React from 'react'
import { Modal } from './Modal'
import { Button, type ButtonVariant } from '../buttons/Button'
import { Sparkles, Check, AlertCircle, HelpCircle, ShieldAlert } from 'lucide-react'

export interface DialogModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  icon?: React.ReactNode
  iconType?: 'success' | 'warning' | 'info' | 'danger' | 'custom'
  children?: React.ReactNode
  confirmText?: string
  cancelText?: string
  confirmVariant?: ButtonVariant
  isLoading?: boolean
}

const ICON_THEMES = {
  success: {
    bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    icon: <Check className="w-5 h-5" />,
  },
  warning: {
    bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    icon: <AlertCircle className="w-5 h-5" />,
  },
  info: {
    bg: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
    icon: <HelpCircle className="w-5 h-5" />,
  },
  danger: {
    bg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    icon: <ShieldAlert className="w-5 h-5" />,
  },
  custom: {
    bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    icon: <Sparkles className="w-5 h-5" />,
  },
}

export const DialogModal: React.FC<DialogModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  icon,
  iconType = 'custom',
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  isLoading = false,
}) => {
  const theme = ICON_THEMES[iconType] || ICON_THEMES.custom
  const renderedIcon = icon || theme.icon

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title={
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${theme.bg}`}>
            {renderedIcon}
          </div>
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg">{title}</h3>
            {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
          </div>
        </div>
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading} size="sm">
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            isLoading={isLoading}
            size="sm"
          >
            {confirmText}
          </Button>
        </>
      }
    >
      {children}
    </Modal>
  )
}
