import React from 'react'
import { Modal } from './Modal'
import { Button } from '../buttons/Button'
import { Info } from 'lucide-react'

export interface InfoModalItem {
  label: string
  value: React.ReactNode
}

export interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  items?: InfoModalItem[]
  children?: React.ReactNode
  badge?: React.ReactNode
  closeButtonText?: string
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  items,
  children,
  badge,
  closeButtonText = 'Done',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-base">{title}</span>
            {badge}
          </div>
        </div>
      }
      description={subtitle}
      footer={
        <Button variant="secondary" onClick={onClose} size="sm">
          {closeButtonText}
        </Button>
      }
    >
      <div className="space-y-4">
        {items && items.length > 0 && (
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl divide-y divide-slate-800/80 overflow-hidden text-xs">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 gap-4">
                <span className="text-slate-400 font-medium shrink-0">{item.label}</span>
                <span className="text-slate-200 font-semibold text-right truncate">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </Modal>
  )
}
