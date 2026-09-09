import React, { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../buttons/Button'
import { AlertTriangle, Trash2 } from 'lucide-react'

export interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  itemName?: string
  message?: string
  isDeleting?: boolean
  requiredConfirmationText?: string // e.g. "DELETE" or item name
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  itemName,
  message = 'Are you sure you want to permanently delete this item? This action cannot be undone and will revoke all associated access.',
  isDeleting = false,
  requiredConfirmationText,
}) => {
  const [typedConfirmation, setTypedConfirmation] = useState('')

  const isConfirmed = requiredConfirmationText
    ? typedConfirmation.trim() === requiredConfirmationText.trim()
    : true

  const handleClose = () => {
    setTypedConfirmation('')
    onClose()
  }

  const handleConfirm = () => {
    if (isConfirmed) {
      onConfirm()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="sm"
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-base">{title}</span>
        </div>
      }
      footer={
        <>
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            isLoading={isDeleting}
            disabled={!isConfirmed || isDeleting}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Delete Permanently
          </Button>
        </>
      }
    >
      <div className="space-y-3.5">
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{message}</p>

        {itemName && (
          <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl text-xs flex items-center gap-2 text-rose-200">
            <span className="font-semibold">Target:</span>
            <code className="bg-rose-950/60 px-1.5 py-0.5 rounded font-mono text-rose-300">
              {itemName}
            </code>
          </div>
        )}

        {requiredConfirmationText && (
          <div className="space-y-1.5 pt-1">
            <label className="text-xs text-slate-400">
              Type <strong className="text-rose-400 font-mono">{requiredConfirmationText}</strong> to confirm:
            </label>
            <input
              type="text"
              value={typedConfirmation}
              onChange={(e) => setTypedConfirmation(e.target.value)}
              placeholder={requiredConfirmationText}
              className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-100 text-xs sm:text-sm px-3 py-2 rounded-lg outline-none font-mono"
            />
          </div>
        )}
      </div>
    </Modal>
  )
}
