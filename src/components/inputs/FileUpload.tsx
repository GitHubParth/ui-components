import React, { useRef, useState } from 'react'
import { UploadCloud, File, X, AlertCircle, CheckCircle2 } from 'lucide-react'

export interface UploadedFileItem {
  id: string
  file: File
  previewUrl?: string
}

export interface FileUploadProps {
  value?: File[]
  onChange: (files: File[]) => void
  label?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  accept?: string
  maxSizeMB?: number
  maxFiles?: number
  containerClassName?: string
  labelClassName?: string
  dropzoneClassName?: string
  errorClassName?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value = [],
  onChange,
  label,
  helperText,
  error,
  required,
  disabled,
  multiple = true,
  accept,
  maxSizeMB = 10,
  maxFiles = 5,
  containerClassName = '',
  labelClassName = '',
  dropzoneClassName = '',
  errorClassName = '',
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelection = (fileList: FileList | null) => {
    if (!fileList || disabled) return
    const incoming = Array.from(fileList)

    const validFiles: File[] = []
    incoming.forEach((file) => {
      const isTooLarge = file.size > maxSizeMB * 1024 * 1024
      if (!isTooLarge) {
        validFiles.push(file)
      }
    })

    if (multiple) {
      const merged = [...value, ...validFiles].slice(0, maxFiles)
      onChange(merged)
    } else {
      if (validFiles.length > 0) onChange([validFiles[0]])
    }
  }

  const removeFile = (index: number) => {
    if (disabled) return
    const updated = value.filter((_, i) => i !== index)
    onChange(updated)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
  }

  return (
    <div className={`flex flex-col gap-1.5 w-full text-left ${containerClassName}`}>
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
          {multiple && (
            <span className="text-xs text-slate-400 font-mono">
              {value.length}/{maxFiles} files
            </span>
          )}
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragOver(false)
          handleFileSelection(e.dataTransfer.files)
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer text-center ${
          isDragOver
            ? 'border-blue-500 bg-blue-600/10 ring-4 ring-blue-500/10'
            : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900/90'
        } ${error ? 'border-rose-500/80 bg-rose-950/10' : ''} ${
          disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
        } ${dropzoneClassName}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={(e) => handleFileSelection(e.target.files)}
          className="sr-only"
        />

        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-2.5 shadow-xs">
          <UploadCloud className="w-5 h-5" />
        </div>

        <p className="text-xs sm:text-sm font-medium text-slate-200">
          <span className="text-blue-400 hover:underline">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {accept || 'Images, PDFs, or documents'} up to {maxSizeMB}MB each
        </p>
      </div>

      {/* Live Preview List */}
      {value.length > 0 && (
        <div className="mt-2 space-y-2">
          {value.map((file, idx) => {
            const isImage = file.type.startsWith('image/')
            const previewUrl = isImage ? URL.createObjectURL(file) : undefined

            return (
              <div
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs gap-3 shadow-xs animate-in fade-in"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {isImage && previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded-md border border-slate-700 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                      <File className="w-5 h-5" />
                    </div>
                  )}

                  <div className="flex flex-col min-w-0">
                    <span className="text-slate-200 font-medium truncate">{file.name}</span>
                    <span className="text-xs text-slate-400 font-mono">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-emerald-400 font-medium items-center gap-1 hidden sm:flex">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Ready
                  </span>
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(idx)
                      }}
                      className="p-1.5 rounded-md hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

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
